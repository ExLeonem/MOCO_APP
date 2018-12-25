use std::sync::mpsc::{Sender, Receiver};
use std::sync::Mutex;
use super::{Color, LedControls};
use std::time::{Duration, SystemTime};

use super::message::Message;

/// LedCache is used to respond to api requests without
/// querying the led controller each time, in case of many
/// successive requests in a short time
pub struct LedCache {
    sender: Mutex<Sender<Message>>,
    receiver: Mutex<Receiver<Message>>,
    last_update: SystemTime,
    cache_time: Duration,
    on: bool,
    color: Color,
    brightness: u8,
    manuel: bool,
}

impl LedCache {
    pub fn new(mut sender: Sender<Message>, mut receiver: Receiver<Message>, cache_time: Duration) -> Self {

        sender.send(Message::GetData).expect("Couldn't not send to LedController");

        let dump = Message::get_dump(&mut sender, &mut receiver);
        println!("{:?}", dump);

        LedCache {
            sender: Mutex::new(sender),
            receiver: Mutex::new(receiver),
            last_update: SystemTime::now(),
            cache_time,
            on: dump.on,
            color: dump.color,
            brightness: dump.brightness,
            manuel: dump.manuel,
        }
    }

    fn update_cache(&mut self) {

    }
}

impl LedControls for LedCache {
    fn set_color(&mut self, color: Color) {
        let sender = self.sender.lock().expect("Could not get sender lock");
        sender.send(Message::UpdateColor(color)).expect("Could not send to controller");
        self.color = color;
    }

    fn color(&self) -> Color {
        self.color
    }

    fn set_on(&mut self, on: bool) {
        let sender = self.sender.lock().expect("Could not get sender lock");
        sender.send(Message::UpdateOn(on)).expect("Could not send to controller");
        self.on = on;
    }

    fn on(&self) -> bool {
        self.on
    }

    fn set_brightness(&mut self, brightness: u8) {
        let sender = self.sender.lock().expect("Could not get sender lock");
        sender.send(Message::UpdateBrightness(brightness)).expect("Could not send to controller");
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