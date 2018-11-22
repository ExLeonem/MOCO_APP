pub mod v1;

use actix_web::http::{header, Method, StatusCode};
use actix_web::{server, App, HttpRequest, Json, middleware, HttpResponse, fs, Result, pred};
use actix_web::server::{HttpHandler, HttpHandlerTask};
use std::sync::{Arc, Mutex};

pub fn v1_app(prefix: &str) -> Box<(dyn actix_web::server::HttpHandler<Task=std::boxed::Box<(dyn actix_web::server::HttpHandlerTask + 'static)>> + 'static)> {
    let counter = Arc::new(Mutex::new(0));
    App::with_state(v1::AppState{counter: counter.clone()})
        .middleware(middleware::Logger::default())
        .prefix(format!("{}/api/v1", prefix)) 
        .resource("/led_status", |r| { r.method(Method::GET).f(v1::led_status) })
        .boxed()
}
