#![feature(proc_macro_hygiene, decl_macro)]
#![feature(box_patterns)]
#![allow(proc_macro_derive_resolution_fallback)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;
#[macro_use] extern crate diesel;

pub mod communication;
pub mod led;
pub mod web;

pub mod schema;
pub mod models;

#[get("/")]
fn hello() -> &'static str {
    "Hello, World"
}

#[database("sqlite")]
pub struct DbConn(diesel::SqliteConnection);

pub fn run_server(addr: &str, port: u16) -> rocket::config::Result<()> {

    use rocket::config::{Config, Environment, LoggingLevel};

    let config = Config::build(Environment::Development)
        .address(addr)
        .port(port)
        .log_level(LoggingLevel::Debug)
        .finalize()?;

    println!("Starting http server: {}:{}", addr, port);

    use rocket::fairing::AdHoc;

    // rocket::custom(config)
    rocket::ignite()
        .mount("/sneaky/moco/", web::routes())
        .mount("/sneaky/moco/", routes![hello])
        .attach(DbConn::fairing())
        .attach(AdHoc::on_launch("Database Migrations", |rocket| {
            let conn = DbConn::get_one(&rocket).unwrap().0;
            diesel_migrations::run_pending_migrations(&conn).unwrap();
        }))
        .launch();

    Ok(())
}
