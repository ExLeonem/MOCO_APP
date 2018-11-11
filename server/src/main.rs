extern crate common;

use std::io::Write;
use std::net::TcpListener;
use std::thread;

fn main() {
    let packet = common::Packet::Text("Bla".to_string());
    println!("{:?}", packet);

    let listener = TcpListener::bind("0.0.0.0:5123").unwrap();
    for stream in listener.incoming() {
        thread::spawn( || {
            let mut stream = stream.unwrap();
            print!("New connection:");
            let addr = stream.peer_addr().unwrap();
            println!("{}", addr);
            let packet = common::Packet::Text("some command".to_string());
            stream.write(&packet.encode()).unwrap();
        });
    }
}
