use crate::led::message::{DataDump, Message};
use crate::led::LedControls;
use crate::models::DbSchedule;
use crate::models::Schedule;
use std::sync::mpsc::{Receiver, Sender, TryRecvError};
use std::time::{Duration, Instant};
use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;

pub fn run(
    mut led: Box<LedControls>,
    mut sender: Sender<Message>,
    receiver: Receiver<Message>,
    database_url: String,
    timezone: i64,
) {
    log::info!("Started Controller thread!");
    let mut notified = false;
    let mut manuel_timestamp = Instant::now();
    let mut check_database = true;
    let mut schedules: Vec<Schedule> = Vec::with_capacity(5);
    let mut running_schedule: Option<Schedule> = None;
    let keep_schedules = 3;
    let manuel_duration = Duration::from_secs(5);
    loop {
        let now = chrono::Utc::now().naive_utc() + chrono::Duration::hours(timezone);
        let recv_result = receiver.try_recv();
        let got_response = recv_result.is_ok();
        match recv_result {
            // handle messages from web server
            Ok(response) => {
                log::info!("Received {:?}", response);
                match response {
                    Message::GetData => {
                        notified = false;
                        let dump = DataDump {
                            on: led.on(),
                            color: led.color(),
                            brightness: led.brightness(),
                            manuel: led.manuel(),
                        };
                        sender
                            .send(Message::DataDump(dump))
                            .expect("Couldn't send to Cache");
                    }
                    Message::UpdateColor(color) => {
                        led.set_color(color);
                        manuel_timestamp = Instant::now();
                    }
                    Message::UpdateOn(on) => {
                        led.set_on(on);
                        manuel_timestamp = Instant::now();
                    }
                    Message::UpdateBrightness(brightness) => {
                        led.set_brightness(brightness);
                        manuel_timestamp = Instant::now();
                    }
                    Message::UpdateManuel(on) => {
                        led.set_manuel(on);
                        manuel_timestamp = Instant::now();
                        if on {
                            if let Some(schedule) = running_schedule {
                                let conn = establish_connection(&database_url);
                                let result = DbSchedule::delete(&conn, schedule.id.unwrap());
                                if let Err(e) = result {
                                    log::warn!("Failed to delete schedule with id {} from database: {}", schedule.id.unwrap(), e);
                                }
                                running_schedule = None;
                                check_database = true;
                                log::info!("Schedule with id {} finished and deleted from database", schedule.id.unwrap());
                            }
                        } 
                    }
                    Message::DatabaseChanged => check_database = true,
                    _ => {
                        log::warn!("Received unexpected Message");
                    }
                }
            }
            // do nothing
            Err(TryRecvError::Empty) => {}
            // communication channel to web server broke, shutdown thread
            Err(TryRecvError::Disconnected) => {
                panic!("Temp");
            }
        }

        // do controller stuff
        // TODO: update led: gpio, check schedules..

        // update schedule list
        if check_database {
            check_database = false;
            let conn = establish_connection(&database_url);
            let mut schedule_list = crate::models::DbSchedule::get_all(&conn).unwrap();
            // sort by activation time
            schedule_list.sort_by(|a, b| {
                a.activation_time.cmp(&b.activation_time)
            });

            schedules.clear();
            schedules.extend_from_slice(&schedule_list[..keep_schedules.min(schedule_list.len())]);

            let mut schedule_text = "Next Schedules:\n".to_string();
            schedules.iter().filter(|schedule| {
                let diff = schedule.activation_time.signed_duration_since(now);
                // delete schedules that are in the past and not currently running
                // this should not happen normally
                if diff < chrono::Duration::minutes(-1) && !schedule.running {
                    check_database = true;
                    match DbSchedule::delete(&conn, schedule.id.unwrap()) {
                        Ok(()) => log::info!("Deleted schedule with id {} because its activation time was in the past and it was not running", schedule.id.unwrap()),
                        Err(e) => log::warn!("Tried to delete schedule with id {}, got error: {}", schedule.id.unwrap(), e),
                    };
                    false
                } else {
                    true
                }
            }).enumerate().for_each(|(i, schedule)| {
                let diff = schedule.activation_time.signed_duration_since(now);
                schedule_text.push_str(&format!("Schedule {:2}.: {} in {}\n", i+1, schedule.activation_time.to_string(), diff));
            });
            schedule_text.pop();
            log::info!("{}", schedule_text);
        }

        match running_schedule {
            Some(schedule) => {
                let diff = schedules[0].activation_time.signed_duration_since(now);
                let active_since_secs = -diff.num_seconds();
                let time_til_100 = chrono::Duration::minutes(5).num_seconds();
                let time_til_off = chrono::Duration::minutes(15).num_seconds();
                let brightness = ((active_since_secs as f32 /  time_til_100 as f32) * 100.0).min(100.0) as u8;
                led.set_on(true);
                led.set_color(schedule.led_setting.color);
                led.set_brightness(brightness);
                if !notified {
                    notify_cache(&mut sender);
                    notified = true;
                }
                if time_til_off < active_since_secs {
                    led.set_on(false);
                    let conn = establish_connection(&database_url);
                    let result = DbSchedule::delete(&conn, schedule.id.unwrap());
                    if let Err(e) = result {
                        log::warn!("Failed to delete schedule with id {} from database: {}", schedule.id.unwrap(), e);
                    }
                    running_schedule = None;
                    check_database = true;
                    log::info!("Schedule with id {} finished and deleted from database", schedule.id.unwrap());
                } else {
                    running_schedule = Some(schedule);
                }
            }
            None => {
                if schedules.len() != 0 {
                    let diff = schedules[0].activation_time.signed_duration_since(now);
                    if diff < chrono::Duration::seconds(5) {
                        schedules[0].running = true;
                        let conn = establish_connection(&database_url);
                        let result = DbSchedule::update(&conn, schedules[0].id.unwrap(), schedules[0].clone().into());
                        if let Err(e) = result {
                            log::warn!("Failed to update schedule with id {} from database: {}", schedules[0].id.unwrap(), e);
                        }
                        running_schedule = Some(schedules[0].clone());
                        log::info!("Schedule with id {} is now running!", schedules[0].id.unwrap());
                    }
                }
            }
        }

        //check if we need to turn off manuel mode
        if led.manuel() {
            if manuel_duration < manuel_timestamp.elapsed() {
                log::info!("Turned of manuel mode because of inactivity");
                led.set_manuel(false);
                if !notified {
                    notify_cache(&mut sender);
                    notified = true;
                }
            }
        }

        if !got_response {
            // sleep only if didn't get message from web server
            std::thread::sleep(std::time::Duration::from_millis(5));
        }
    }
}

// call when some data changed, that was not explicit requested by cache
fn notify_cache(sender: &mut Sender<Message>) {
    log::info!("Notified chache");
    sender
        .send(Message::DataChanged)
        .expect("Couldn't send to cache");
}

pub fn establish_connection(database_url: &str) -> SqliteConnection {
    SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}