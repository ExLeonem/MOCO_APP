//! # Routes for Endpoint /api/v1/
//!
//! [led_status](fn.led_status.html) \
//! [set_led](fn.set_led.html) \
//! [get_schedules](fn.get_schedules.html) \
//! [get_schedule](fn.get_schedule.html) \
//! [add_schedule](fn.add_schedule.html) \
//! [delete_schedule](fn.delete_schedule.html) \
//! [update_schedule](fn.update_schedule.html) \
//! ` `

use crate::led::cache::LedCache;
use crate::led::LedControls;
use crate::models::*;
use crate::web::Response;
use crate::DbConn;
use rocket::State;
use rocket_contrib::json::{Json, JsonValue};
use std::sync::Mutex;

/// routes for `/api/v1/`
pub fn routes() -> Vec<rocket::Route> {
    let routes = routes![
        led_status,
        set_led,
        get_schedules,
        get_schedule,
        delete_schedule,
        add_schedule,
        update_schedule
    ];
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
fn led_status(cache: State<Mutex<LedCache>>) -> Json<LedStatus> {
    let mut cache = cache.lock().expect("Could not aquire lock of LedCache");
    cache.handle_messages();
    let c = cache.color();
    Json(LedStatus {
        on: cache.on(),
        color: [c.0, c.1, c.2],
        brightness: cache.brightness(),
        manuel: cache.manuel(),
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
    Json(Response::Ok(Some("Led status updated".to_string())))
}

/// Get all schedules
///
/// # Endpoint
///
/// `/api/v1/schedules`
///
/// # Method
///
/// `GET`
///
/// # Response
///
/// ## On Success
///
/// ```json
/// [
///   {
///     "activation_time": "2018-06-03T12:34:56.229",
///     "active": true,
///     "device": "test",
///     "id": 2,
///     "integration": "manuel",
///     "led_setting": {
///       "color": [
///         100,
///         20,
///         10
///       ],
///       "mode": "Default"
///     }
///   },
///   {
///     "activation_time": "2018-05-03T12:34:00",
///     "active": true,
///     "device": "test",
///     "id": 4,
///     "integration": "manuel",
///     "led_setting": {
///       "color": [
///         100,
///         20,
///         10
///       ],
///       "mode": "Default"
///     }
///   }
/// ]
/// ```
///
/// ## On Failure
///
/// ```json
/// {
///     "error": "Error Message"
/// }
/// ```
///
/// # cURL
///
/// ```bash
/// curl --request GET \
///   --url ${base_url}/api/v1/schedules
/// ```
#[get("/api/v1/schedules")]
fn get_schedules(conn: DbConn) -> Json<serde_json::Value> {
    let schedules = DbSchedule::get_all(&*conn);
    let json: serde_json::Value = match schedules {
        Ok(schedules) => {
            let schedules: Vec<Schedule> = schedules.into_iter().map(|x| x.into()).collect();
            serde_json::to_value(schedules).unwrap()
        }
        Err(e) => json!({
            "error": e.to_string()
        })
        .take(),
    };
    Json(json)
}

/// Get Schedule with given `id`
/// # Endpoint
///
/// `/api/v1/schedule/<id>`
///
/// `id`: Integer
///
/// # Method
///
/// `GET`
///
/// # Response
///
/// ## On Success
///
/// ```json
/// {
///   "activation_time": "2018-05-03T12:34:16.100",
///   "active": false,
///   "device": "test",
///   "id": 4,
///   "integration": "manuel",
///   "led_setting": {
///     "color": [
///       100,
///       20,
///       10
///     ],
///     "mode": "Default"
///   }
/// }
/// ```
///
/// ## On Failure
///
/// ```json
/// {
///     "error": "Error Message"
/// }
/// ```
///
/// # cURL
///
/// ```bash
/// curl --request GET \
///   --url ${base_url}/api/v1/schedule/1
/// ```
#[get("/api/v1/schedule/<id>")]
fn get_schedule(conn: DbConn, id: i32) -> Json<serde_json::Value> {
    let schedule = DbSchedule::get(&conn, id);

    let json: serde_json::Value = match schedule {
        Ok(schedule) => serde_json::to_value(schedule).unwrap(),
        Err(e) => json!({
            "error": e.to_string()
        })
        .take(),
    };
    Json(json)
}

/// Crate new schedule
///
/// # Endpoint
///
/// `/api/v1/schedule`
///
/// # Method
///
/// `POST`
///
/// # Response
///
/// ## On Success
///
/// ```json
/// {
///   "activation_time": "2021-06-03T12:34:00",
///   "active": true,
///   "device": "test",
///   "id": 19,
///   "integration": "manuel",
///   "led_setting": {
///     "color": [
///       100,
///       20,
///       10
///     ],
///     "mode": "Default"
///   }
/// }
/// ```
///
/// ## On Failure
///
/// ```json
/// {
///     "error": "Error Message"
/// }
/// ```
///
/// # cURL
///
/// ```bash
/// curl --request POST \
///   --url ${base_url}/api/v1/schedule \
///   --header 'content-type: application/json' \
///   --data '{
///     "device": "test",
///     "integration": "manuel",
///     "led_setting" : {
/// 			"mode": "Default",
/// 			"color": [100, 20, 10]
/// 		},
///     "activation_time": "2021-06-03T12:34:00.000",
///     "active": true
/// }'
/// ```
#[post("/api/v1/schedule", format = "json", data = "<schedule>")]
fn add_schedule(conn: DbConn, schedule: Json<Schedule>) -> JsonValue {
    let schedule = schedule.into_inner();
    let new_schedule = DbSchedule::add(&*conn, schedule.into());
    let json = match new_schedule {
        Ok(new_schedule) => serde_json::to_value(Schedule::from(new_schedule)).unwrap(),
        Err(e) => json!({
            "error": e.to_string()
        })
        .take(),
    };

    JsonValue::from(json)
}

/// Delete Schedule with given `id`
/// # Endpoint
///
/// `/api/v1/schedule/<id>`
///
/// `id`: Integer
///
/// # Method
///
/// `DELETE`
///
/// # Response
///
/// ## On Success
///
/// ```json
/// {
///   "deleted": 19
/// }
/// ```
///
/// ## On Failure
///
/// ```json
/// {
///     "error": "Error Message"
/// }
/// ```
///
/// # cURL
///
/// ```bash
/// curl --request DELETE \
///   --url ${base_url}/api/v1/schedule/19
/// ```
#[delete("/api/v1/schedule/<id>")]
fn delete_schedule(conn: DbConn, id: i32) -> Json<serde_json::Value> {
    let schedule = DbSchedule::delete(&conn, id);

    let json: serde_json::Value = match schedule {
        Ok(()) => json!({ "deleted": id }).take(),
        Err(e) => json!({
            "error": e.to_string()
        })
        .take(),
    };
    Json(json)
}

/// Update Schedule with given `id`
/// # Endpoint
///
/// `/api/v1/schedule/<id>`
///
/// # Method
///
/// `PUT`
///
/// # Response
///
/// ## On Success
///
/// ```json
/// {
///   "activation_time": "2018-05-03T12:34:00",
///   "active": true,
///   "device": "test",
///   "id": 4,
///   "integration": "manuel",
///   "led_setting": {
///     "color": [
///       100,
///       20,
///       10
///     ],
///     "mode": "Default"
///   }
/// }
/// ```
///
/// ## On Failure
///
/// ```json
/// {
///     "error": "Error Message"
/// }
/// ```
///
/// # cURL
///
/// ```bash
/// curl --request PUT \
///   --url ${base_url}/api/v1/schedule/4 \
///   --header 'content-type: application/json' \
///   --data '{
/// 	"activation_time": "2018-05-03T12:34:00.000",
/// 	"active": true,
/// 	"device": "test",
/// 	"integration": "manuel",
/// 	"led_setting": {
/// 		"color": [
/// 			100,
/// 			20,
/// 			10
/// 		],
/// 		"mode": "Default"
/// 	}
/// }'
/// ```
#[put("/api/v1/schedule/<id>", format = "json", data = "<schedule>")]
fn update_schedule(conn: DbConn, id: i32, schedule: Json<Schedule>) -> JsonValue {
    let schedule = schedule.into_inner();
    let new_schedule = DbSchedule::update(&*conn, id, schedule.into());
    let json = match new_schedule {
        Ok(new_schedule) => serde_json::to_value(Schedule::from(new_schedule)).unwrap(),
        Err(e) => json!({
            "error": e.to_string()
        })
        .take(),
    };

    JsonValue::from(json)
}
