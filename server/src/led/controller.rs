use crate::led::message::{DataDump, Message};
use crate::led::LedControls;
use crate::models::DbSchedule;
use crate::models::Schedule;
use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use std::sync::mpsc::{Receiver, Sender, TryRecvError};
use std::time::Duration;
use std::time::Instant;

pub struct Controller {
    led: Box<LedControls>,
    sender: Sender<Message>,
    receiver: Receiver<Message>,
    database_url: String,
    timezone: i64,
    manuel_duration: Duration,
    keep_schedules: usize,
    time_til_100: Duration,
    time_til_off: Duration,
    schedules: Vec<Schedule>,
    running_schedule: Option<Schedule>,
    check_database: bool,
    manuel_timestamp: Option<std::time::Instant>,
    got_response: bool,
    notified_cache: bool,
}

impl Controller {
    pub fn new(
        led: Box<LedControls>,
        sender: Sender<Message>,
        receiver: Receiver<Message>,
        database_url: String,
        timezone: i64,
    ) -> Self {
        Controller {
            led,
            sender,
            receiver,
            database_url,
            timezone,
            manuel_duration: chrono::Duration::minutes(1).to_std().unwrap(),
            keep_schedules: 3,
            time_til_100: chrono::Duration::minutes(1).to_std().unwrap(),
            time_til_off: chrono::Duration::minutes(3).to_std().unwrap(),
            schedules: Vec::with_capacity(5),
            running_schedule: None,
            check_database: false,
            manuel_timestamp: None,
            got_response: false,
            notified_cache: false,
        }
    }

    pub fn run(&mut self) -> ! {
        log::info!("Started Controller thread!");

        loop {
            let now = chrono::Utc::now().naive_utc() + chrono::Duration::hours(self.timezone);

            self.handle_message();
            self.update_database(now);
            self.handle_schedule(now);
            self.handle_manuel();

            if !self.got_response {
                // sleep only if didn't get message from web server
                std::thread::sleep(std::time::Duration::from_millis(5));
            }
        }
    }

    fn handle_message(&mut self) {
        let recv_result = self.receiver.try_recv();
        self.got_response = recv_result.is_ok();
        match recv_result {
            // handle messages from web server
            Ok(response) => {
                log::info!("Received {:?}", response);
                match response {
                    Message::GetData => {
                        self.notified_cache = false;
                        let dump = DataDump {
                            on: self.led.on(),
                            color: self.led.color(),
                            brightness: self.led.brightness(),
                        };
                        self.sender
                            .send(Message::DataDump(dump))
                            .expect("Couldn't send to Cache");
                    }
                    Message::UpdateColor(color) => {
                        self.led.set_color(color);
                        self.update_manuel_timestamp();
                    }
                    Message::UpdateOn(on) => {
                        self.led.set_on(on);
                        self.update_manuel_timestamp();
                    }
                    Message::UpdateBrightness(brightness) => {
                        self.led.set_brightness(brightness);
                        self.update_manuel_timestamp();
                    }
                    Message::DatabaseChanged => self.check_database = true,
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
    }

    fn update_database(&mut self, now: chrono::NaiveDateTime) {
        if self.check_database {
            self.check_database = false;
            let conn = establish_connection(&self.database_url);
            let mut schedule_list = crate::models::DbSchedule::get_all(&conn).unwrap();
            // sort by activation time
            schedule_list.sort_by(|a, b| a.activation_time.cmp(&b.activation_time));

            if let Some(schedule) = self.running_schedule.clone() {
                let still_alive = schedule_list.iter().filter(|x| x.id == schedule.id).next();
                if !still_alive.is_some() {
                    self.running_schedule = None;
                    self.led.set_on(false);
                }
            }

            self.schedules.clear();
            self.schedules
                .extend_from_slice(&schedule_list[..self.keep_schedules.min(schedule_list.len())]);

            let mut schedule_text = "Next Schedules:\n".to_string();
            self.schedules.clone().iter().filter(|schedule| {
                let diff = schedule.activation_time.signed_duration_since(now);
                // delete schedules that are in the past and not currently running
                // this should not happen normally
                if diff < chrono::Duration::minutes(-1) && !schedule.running {
                    self.check_database = true;
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
    }

    fn handle_schedule(&mut self, now: chrono::NaiveDateTime) {
        match self.running_schedule.clone() {
            Some(schedule) => {
                let diff = schedule.activation_time.signed_duration_since(now);
                let active_since_secs = -diff.num_seconds();
                let time_til_100 = chrono::Duration::from_std(self.time_til_100)
                    .unwrap()
                    .num_seconds();
                let time_til_off = chrono::Duration::from_std(self.time_til_off)
                    .unwrap()
                    .num_seconds();
                let brightness =
                    ((active_since_secs as f32 / time_til_100 as f32) * 100.0).min(100.0) as u8;
                if self.led.color() != schedule.led_setting.color {
                    self.led.set_color(schedule.led_setting.color);
                    self.notify_cache();
                }
                if self.led.brightness() != brightness {
                    self.led.set_brightness(brightness);
                    self.notify_cache();
                }
                if self.led.on() != true {
                    self.led.set_on(true);
                    self.notify_cache();
                }
                if time_til_off < active_since_secs {
                    if self.led.on() != false {
                        self.led.set_on(false);
                        self.notify_cache();
                    }
                    Controller::delete_schedule(&self.database_url, self.running_schedule.take().unwrap());
                    self.check_database = true;
                    log::info!(
                        "Schedule with id {} finished and deleted from database",
                        schedule.id.unwrap()
                    );
                } else {
                    self.running_schedule = Some(schedule);
                }
            }
            None => {
                if self.schedules.len() != 0 {
                    let diff = self.schedules[0].activation_time.signed_duration_since(now);
                    if diff < chrono::Duration::seconds(5) {
                        self.schedules[0].running = true;
                        let conn = establish_connection(&self.database_url);
                        let result = DbSchedule::update(
                            &conn,
                            self.schedules[0].id.unwrap(),
                            self.schedules[0].clone().into(),
                        );
                        if let Err(e) = result {
                            log::warn!(
                                "Failed to update schedule with id {} from database: {}",
                                self.schedules[0].id.unwrap(),
                                e
                            );
                        }
                        self.running_schedule = Some(self.schedules[0].clone());
                        self.schedules.remove_item(&self.running_schedule.clone().unwrap());
                        log::info!(
                            "Schedule with id {} is now running!",
                            self.schedules[0].id.unwrap()
                        );
                    }
                }
            }
        }
    }

    fn handle_manuel(&mut self) {
        self.manuel_timestamp = match self.manuel_timestamp.take() {
            None => None,
            Some(manuel_timestamp) => {
                if self.manuel_duration < manuel_timestamp.elapsed() {
                    log::info!("Turned of manuel mode because of inactivity");
                    self.led.set_on(false);
                    self.notify_cache();
                    None
                } else {
                    Some(manuel_timestamp)
                }
            }
        };
    }

    fn notify_cache(&mut self) {
        if !self.notified_cache {
            self.notified_cache = true;
            log::info!("Notified chache");
            self.sender
                .send(Message::DataChanged)
                .expect("Couldn't send to cache");
        }
    }

    fn update_manuel_timestamp(&mut self) {
        self.manuel_timestamp = Some(Instant::now());
        if self.running_schedule.is_some() {
            Controller::delete_schedule(&self.database_url, self.running_schedule.take().unwrap());
            log::info!("running schedule is {:?}, schedules.len is {}", self.running_schedule, self.schedules.len());
        }
    }

    fn delete_schedule(conn: &str, schedule: Schedule) {
        let conn = establish_connection(conn);
        let result = DbSchedule::delete(&conn, schedule.id.unwrap());
        if let Err(e) = result {
            log::warn!(
                "Failed to delete schedule with id {} from database: {}",
                schedule.id.unwrap(),
                e
            );
        }
    }
}

pub fn establish_connection(database_url: &str) -> SqliteConnection {
    SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}


#[cfg(test)]
mod tests {
    // https://doc.rust-lang.org/stable/book/ch11-01-writing-tests.html#checking-results-with-the-assert-macro
    use std::sync::mpsc::channel;
    use std::sync::mpsc::{Sender, Receiver};
    use crate::led::message::Message;
    use crate::models::{LedSetting, LedMode, Schedule};
    use super::*;

    fn create_controller() -> (Sender<Message>, Receiver<Message>, Controller) {
        let light_source = Box::new(crate::led::MocLedStrip::new());
        let (controller_tx, controller_rx) = channel();
        let (cache_tx, cache_rx) = channel();
        let conn = ":memory:".to_owned();
        let timezone = 1;

        let controller = Controller::new(
            light_source,
            controller_tx,
            cache_rx,
            conn,
            timezone,
        );

        (cache_tx, controller_rx, controller)
    }

    #[test]
    fn send_data_dump() {
        let (tx, rx, mut controller) = create_controller();

        // send GetData and check if we receive DataDump
        tx.send(Message::GetData).unwrap();
        controller.handle_message();
        match rx.recv().unwrap() {
            Message::DataDump(..) => {},
            _ => assert!(false),
        }
    }

    #[test]
    fn update_on() {
        let (tx, _rx, mut controller) = create_controller();

        // update on to true
        tx.send(Message::UpdateOn(true)).unwrap();
        controller.handle_message();
        assert_eq!(controller.led.on(), true);

        // update on to false
        tx.send(Message::UpdateOn(false)).unwrap();
        controller.handle_message();
        assert_eq!(controller.led.on(), false);
    }

    #[test]
    fn update_color() {
        let (tx, _rx, mut controller) = create_controller();

        // update on to true
        tx.send(Message::UpdateColor([10, 20, 30])).unwrap();
        controller.handle_message();
        assert_eq!(controller.led.color(), [10, 20, 30]);

        // update on to false
        tx.send(Message::UpdateColor([100, 100, 100])).unwrap();
        controller.handle_message();
        assert_eq!(controller.led.color(), [100, 100, 100]);
    }

    #[test]
    fn update_brightness() {
        let (tx, _rx, mut controller) = create_controller();

        // update on to true
        tx.send(Message::UpdateBrightness(50)).unwrap();
        controller.handle_message();
        assert_eq!(controller.led.brightness(), 50);

        // update on to false
        tx.send(Message::UpdateBrightness(0)).unwrap();
        controller.handle_message();
        assert_eq!(controller.led.brightness(), 0);
    }

    #[test]
    fn stop_schedule_when_updating_led() {
        let (tx, _rx, mut controller) = create_controller();
        let now = chrono::Utc::now().naive_utc() + chrono::Duration::hours(controller.timezone);
        controller.running_schedule = Some(Schedule{
            id: Some(0),
            activation_time: now,
            active: true,
            device: "test".to_owned(),
            integration: "maunel".to_owned(),
            running: true,
            led_setting: LedSetting { mode: LedMode::Default, color: [50, 50, 50]},
        });

        controller.handle_schedule(now);
        tx.send(Message::UpdateColor([100, 100, 100])).unwrap();
        controller.handle_message();
        assert_eq!(None, controller.running_schedule);

    }
}