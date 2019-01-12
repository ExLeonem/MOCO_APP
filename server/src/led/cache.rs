use super::{Color, LedControls};
use std::sync::mpsc::{Receiver, Sender, TryRecvError};
use std::sync::Mutex;

use super::message::Message;

/// LedCache is used to respond to api requests without
/// querying the led controller each time, in case of many
/// successive requests in a short time
pub struct LedCache {
    sender_receiver: Mutex<(Sender<Message>, Receiver<Message>)>,
    on: bool,
    color: Color,
    brightness: u8,
}

impl LedCache {
    // don't block by recving something, because we would deadlock in rocket creation
    pub fn new(sender: Sender<Message>, receiver: Receiver<Message>) -> Self {
        sender
            .send(Message::GetData)
            .expect("Couldn't not send to LedController");
        LedCache {
            sender_receiver: Mutex::new((sender, receiver)),
            on: false,
            color: [0,0,0],
            brightness: 0,
        }
    }

    pub fn update_cache(&mut self) {
        let channel = self.sender_receiver.lock().expect("Couln't lock channel");
        channel
            .0
            .send(Message::GetData)
            .expect("Couldn't not send to LedController");
        // TODO: workaround to update in same web request
        std::thread::sleep(std::time::Duration::from_millis(5));
    }

    pub fn send_message(&mut self, message: Message) {
        let channel = self.sender_receiver.lock().expect("Couln't lock channel");
        channel
            .0
            .send(message)
            .expect("Couldn't not send to LedController");
    }

    pub fn handle_messages(&mut self) {
        let mut got_message = true;
        let mut message_limit = 5;
        while got_message && message_limit != 0 {
            let recv_result = {
                let channel = self.sender_receiver.lock().expect("Couln't lock channel");
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
}
