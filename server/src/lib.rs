#![feature(proc_macro_hygiene, decl_macro)]
#![feature(box_patterns)]
#![allow(proc_macro_derive_resolution_fallback)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate diesel;

pub mod led;
pub mod web;

pub mod models;
pub mod schema;

use std::sync::mpsc::channel;
use std::sync::Mutex;
use std::thread;
use crate::led::LedControls;

#[get("/")]
fn hello() -> &'static str {
    "Hello, World"
}

#[database("sqlite")]
pub struct DbConn(diesel::SqliteConnection);

pub struct Timezone(i64);

pub fn run_server() -> rocket::config::Result<()> {
    use rocket::fairing::AdHoc;

    let (controller_tx, controller_rx) = channel();
    let (cache_tx, cache_rx) = channel();

    rocket::ignite()
        .mount("/sneaky/moco/", web::routes())
        .mount("/sneaky/moco/", routes![hello])
        .attach(DbConn::fairing())
        .attach(AdHoc::on_launch("Database Migrations", |rocket| {
            let conn = DbConn::get_one(&rocket).unwrap().0;
            diesel_migrations::run_pending_migrations(&conn).unwrap();
        }))
        .attach(AdHoc::on_launch("Controller Thread", |rocket| {
            let config = rocket.config();
            let conn = rocket_contrib::databases::database_config("sqlite", config).unwrap().url.to_owned();
            let light_source = config.get_str("light_source").unwrap_or("moc").to_owned();
            let timezone = rocket.config()
                .get_int("timezone")
                .unwrap_or(1);

            let light_source: Box<LedControls + Send> = match light_source.as_ref() {
                "moc" => Box::new(led::MocLedStrip::new()),
                "4pin" => Box::new(led::LedStrip::new()),
                _ => panic!("\"{}\" is a unknown light source, please change config", light_source),
            };

            thread::spawn(move || {
                led::controller::run(light_source, controller_tx, cache_rx, conn, timezone);
            });
        }))
        .attach(AdHoc::on_attach("Assets Config", |rocket| {
            let timezone = rocket.config()
                .get_int("timezone")
                .unwrap_or(1);

            Ok(rocket.manage(Timezone(timezone)))
        }))
        .manage(Mutex::new(led::cache::LedCache::new(
            cache_tx,
            controller_rx,
        )))
        .launch();

    Ok(())
}
