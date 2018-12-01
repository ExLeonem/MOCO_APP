//! # Routes for Endpoint /api/v1/
//!
//! [led_status](fn.led_status.html) \
//! [set_led](fn.set_led.html) \
//! ` `

use rocket_contrib::json::Json;
use crate::web::Response;

/// routes for `/api/v1/`
pub fn routes() -> Vec<rocket::Route> {
    let routes = routes![led_status, set_led];
    routes
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
///         "brightness": 50,
///         "manuel": off,
///     }
/// }
/// ```
///
/// # cURL
///
/// ```bash
/// curl -i -X GET ${endpoint}
/// ```
#[get("/api/v1/led_status")]
fn led_status() -> Json<LedStatus> {
    Json(LedStatus {
        on: true,
        color: [20, 10, 5],
        brightness: 20,
        manuel: false,
    })
}


#[derive(Deserialize, Serialize, Debug)]
pub struct LedStatus {
    on: bool,
    color: [u8; 3],
    brightness: u8,
    manuel: bool,
}

/// Set the led
///
/// # Endpoint
///
/// `/api/v1/set_led`
///
/// # Method
///
/// `POST`
///
/// # Response
///
/// ```json
/// {
///     "status": "ok",
/// }
/// ```
///
/// # cURL
///
/// ```bash
/// curl -i -X POST -H 'Content-Type: application/json' -d '{"on":true, "color":[20,10,5],"brightness":20, "manuel":false}' ${endpoint}
/// ```
///
#[post("/api/v1/set_led", data = "<led_status>")]
pub fn set_led(led_status: Json<LedStatus>) -> Json<Response> {
    Json(
        Response::Ok(Some("Led status updated".to_string()))
    )
}