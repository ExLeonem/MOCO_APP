pub mod v1;

/// routes for `/api/`
pub fn routes() -> Vec<rocket::Route> {
    let routes = v1::routes();
    routes
}
