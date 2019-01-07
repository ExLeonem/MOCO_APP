//! Web related stuff index, 404 etc...

pub mod api;

#[derive(Deserialize, Serialize, Debug)]
pub enum Response {
    Ok(Option<String>),
}

/// routes for `/`
pub fn routes() -> Vec<rocket::Route> {
    let routes = api::routes();
    routes
}
