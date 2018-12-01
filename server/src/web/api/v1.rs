use crate::communication::Commands;

use actix_web::{HttpRequest, HttpResponse};

use std::sync::{Arc, Mutex};

#[derive(Default)]
pub struct AppState {
    pub counter: Arc<Mutex<usize>>,   
}

/// Returns json data about the current led status
/// 
/// # Endpoint 
///
/// `/api/v1/led_status`
///
/// # Method 
///
/// `GET`
///
/// # Response
///
/// ```json
/// {
///     "LedStatus": {
///         "on": true,
///         "color": [100, 20, 30],
///         "brightness": 50
///     }
/// }
/// ```
pub fn led_status(_req: &HttpRequest<AppState>) -> HttpResponse {
    HttpResponse::Ok()
        .json(Commands::LedStatus {
            on: true,
            color: [30, 20, 10],
            brightness: 50,
            }
        )
}

