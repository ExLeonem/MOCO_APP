use super::message::{DataDump, Message};
use super::LedControls;
use std::sync::mpsc::{Receiver, Sender, TryRecvError};

pub fn run(
    mut led: Box<LedControls>,
    mut sender: Sender<Message>,
    receiver: Receiver<Message>,
) {
    log::info!("Started Controller thread!");
    let mut counter = 0usize;
    let mut notified = false;
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

        // temp test data
        // TODO: update led: gpio, check schedules..
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
