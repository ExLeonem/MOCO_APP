#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

pub mod communication;
pub mod led;
pub mod web;

#[get("/")]
fn hello() -> &'static str {
    "Hello, World"
}


pub fn run_server(addr: &str, port: u16) -> rocket::config::Result<()> {

    use rocket::config::{Config, Environment, LoggingLevel};

    let config = Config::build(Environment::Development)
        .address(addr)
        .port(port)
        .log_level(LoggingLevel::Debug)
        .finalize()?;

    println!("Starting http server: {}:{}", addr, port);

    rocket::custom(config)
        .mount("/sneaky/moco/", web::routes())
        .launch();

    Ok(())
}
