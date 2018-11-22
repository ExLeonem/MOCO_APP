extern crate actix_web;
extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

pub mod communication;
pub mod led;
pub mod web;


use actix_web::http::{header, Method, StatusCode};
use actix_web::{server, App, HttpRequest, Json, middleware, HttpResponse, fs, Result, pred};

pub fn run_server(bind: &str) {
    let sys = actix::System::new("ws-example");

    server::new(|| {
        vec![
            web::api::v1_app("sneaky/moco"),
            web::app("sneaky/moco"),
        ]
    })
        .bind(bind)
        .unwrap()
        .start();

    println!("Started http server: 127.0.0.1:8080");
    let _ = sys.run();
}
