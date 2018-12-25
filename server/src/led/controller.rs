use std::sync::mpsc::{Sender, Receiver, TryRecvError};
use super::LedControls;
use super::message::{Message, DataDump};

pub fn run(mut led: Box<LedControls>, sender: Sender<Message>, receiver: Receiver<Message>) {
    log::info!("Started Controller thread!");
    loop {
        let recv_result = receiver.try_recv();
        let got_response = recv_result.is_ok();
        match recv_result {
            // handle messages from web server
            Ok(response) => {
                log::info!("Received {:?}", response);
                match response {
                    Message::GetData => {
                        let dump = DataDump {
                            on: led.on(),
                            color: led.color(),
                            brightness: led.brightness(),
                            manuel: led.manuel(),
                        };
                        sender.send(Message::DataDump(dump)).expect("Couldn't send to Cache");
                    }
                    Message::UpdateColor(color) => led.set_color(color),
                    Message::UpdateOn(on) => led.set_on(on),
                    Message::UpdateBrightness(brightness) => led.set_brightness(brightness),
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

        if !got_response {
            // sleep only if didn't get message from web server
            std::thread::sleep(std::time::Duration::from_millis(5));
        }

        // TODO: update led: gpio, check schedules..

        
    }
}