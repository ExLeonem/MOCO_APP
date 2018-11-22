extern crate server;


use std::io::Write;
use std::net::TcpListener;
use std::thread;

use server::led::LedController;


fn main() {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    server::run_server("127.0.0.1:8080");
}
