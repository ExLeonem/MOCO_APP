use super::message::{DataDump, Message};
use super::LedControls;
use std::sync::mpsc::{Receiver, Sender, TryRecvError};
use std::time::{Duration, Instant};
use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;

pub fn run(
    mut led: Box<LedControls>,
    mut sender: Sender<Message>,
    receiver: Receiver<Message>,
    database_url: String,
) {
    log::info!("Started Controller thread!");
    let mut counter = 0usize;
    let mut notified = false;
    let mut manuel_timestamp = Instant::now();
    let mut check_database = true;
    let mut schedules = Vec::with_capacity(5);
    let keep_schedules = 3;
    let manuel_duration = Duration::from_secs(5);
    loop {
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
            let conn = establish_connection(&database_url);
            let mut schedule_list = crate::models::DbSchedule::get_all(&conn).unwrap();
            // sort by activation time
            schedule_list.sort_by(|a, b| {
                a.activation_time.cmp(&b.activation_time)
            });

            schedules.clear();
            schedules.extend_from_slice(&schedule_list[..keep_schedules.min(schedule_list.len())]);

            let mut schedule_text = "Next Schedules:\n".to_string();
            schedules.iter().enumerate().for_each(|(i, x)| schedule_text.push_str(&format!("Schedule {:2}.: {}\n", i+1, x.activation_time.to_string())));
            schedule_text.pop();
            log::info!("{}", schedule_text);

            check_database = false;
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

        // temp test data
        counter += 1;
        if counter == 50 {
            let mut brightness = led.brightness() + 1;
            if brightness == 101 {
                brightness = 0;
            }
            led.set_brightness(brightness);
            counter = 0;
            if !notified {
                notify_cache(&mut sender);
                notified = true;
            }
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