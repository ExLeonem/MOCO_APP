extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

use std::io::Write;
use std::net::TcpListener;
use std::thread;

use self::led::LedController;

mod communication;
mod led;

fn main() {
    // let packet = common::Packet::Text("Bla".to_string());
    // println!("{:?}", packet);

    // test packet deserialization
    let data = include_str!("../../jsons/manuel_control.json");
    let command: communication::Commands = serde_json::from_str(data).unwrap();
    println!("{:?}", command);


    let mut led_strip = led::MocLedStrip::new();

    return;
    let listener = TcpListener::bind("0.0.0.0:5123").unwrap();
    for stream in listener.incoming() {
        thread::spawn( || {
            let mut stream = stream.unwrap();
            print!("New connection:");
            let addr = stream.peer_addr().unwrap();
            println!("{}", addr);
            // let packet = common::Packet::Text("some command".to_string());
            // stream.write(&packet.encode()).unwrap();
        });
    }
}
