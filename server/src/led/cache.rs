use super::{Color, LedControls};
use std::sync::mpsc::{Receiver, Sender, TryRecvError};
use std::sync::Mutex;
use std::time::{Duration, SystemTime};

use super::message::Message;

/// LedCache is used to respond to api requests without
/// querying the led controller each time, in case of many
/// successive requests in a short time
pub struct LedCache {
    sender_receiver: Mutex<(Sender<Message>, Receiver<Message>)>,
    last_update: SystemTime,
    cache_time: Duration,
    on: bool,
    color: Color,
    brightness: u8,
    manuel: bool,
}

impl LedCache {
    pub fn new(sender: Sender<Message>, receiver: Receiver<Message>, cache_time: Duration) -> Self {
        sender
            .send(Message::GetData)
            .expect("Couldn't not send to LedController");
        let mut channel = (sender, receiver);
        let dump = Message::get_dump(&mut channel);
        println!("{:?}", dump);

        LedCache {
            sender_receiver: Mutex::new(channel),
            last_update: SystemTime::now(),
            cache_time,
            on: dump.on,
            color: dump.color,
            brightness: dump.brightness,
            manuel: dump.manuel,
        }
    }

    pub fn update_cache(&mut self) {
        let mut channel = self.sender_receiver.lock().expect("Couln't lock channel");
        channel
            .0
            .send(Message::GetData)
            .expect("Couldn't not send to LedController");
        // TODO: workaround to update in same web request
        std::thread::sleep(std::time::Duration::from_millis(5));
    }

    pub fn handle_messages(&mut self) {
        let mut got_message = true;
        let mut message_limit = 5;
        while got_message && message_limit != 0 {
            let recv_result = {
                let mut channel = self.sender_receiver.lock().expect("Couln't lock channel");
                channel.1.try_recv()
            };
            got_message = false;
            match recv_result {
                Ok(response) => {
                    got_message = true;
                    message_limit -= 1;
                    match response {
                        Message::DataChanged => {
                            log::info!("Cache updating data...");
                            self.update_cache();
                        }
                        Message::DataDump(dump) => {
                            self.on = dump.on;
                            self.color = dump.color;
                            self.brightness = dump.brightness;
                            self.manuel = dump.manuel;
                            log::info!("Cache updated data");
                        }
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
    }
}

impl LedControls for LedCache {
    fn set_color(&mut self, color: Color) {
        let channel = self.sender_receiver.lock().expect("Couln't lock channel");
        channel
            .0
            .send(Message::UpdateColor(color))
            .expect("Could not send to controller");
        self.color = color;
    }

    fn color(&self) -> Color {
        self.color
    }

    fn set_on(&mut self, on: bool) {
        let channel = self.sender_receiver.lock().expect("Couln't lock channel");
        channel
            .0
            .send(Message::UpdateOn(on))
            .expect("Could not send to controller");
        self.on = on;
    }

    fn on(&self) -> bool {
        self.on
    }

    fn set_brightness(&mut self, brightness: u8) {
        let channel = self.sender_receiver.lock().expect("Couln't lock channel");
        channel
            .0
            .send(Message::UpdateBrightness(brightness))
            .expect("Could not send to controller");
        self.brightness = brightness;
    }

    fn brightness(&self) -> u8 {
        self.brightness
    }

    fn manuel(&self) -> bool {
        self.manuel
    }

    fn set_manuel(&mut self, manuel: bool) {
        self.manuel = manuel
    }
}
