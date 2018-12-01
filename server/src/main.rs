extern crate server;

fn main() {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    server::run_server("127.0.0.1:8080");
}
