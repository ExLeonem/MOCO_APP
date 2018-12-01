pub mod api;

use actix_web::http::{Method, StatusCode};
use actix_web::{App, HttpRequest, middleware, HttpResponse, fs, Result, pred};

fn index(_req: &HttpRequest) -> &'static str {
    "Hello World"
}

fn p404(_req: &HttpRequest) -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open("server/static/404.html")?.set_status_code(StatusCode::NOT_FOUND))
}

pub fn app(prefix: &str) -> Box<(dyn actix_web::server::HttpHandler<Task=std::boxed::Box<(dyn actix_web::server::HttpHandlerTask + 'static)>> + 'static)> {
    App::new()
        .prefix(prefix)
        .middleware(middleware::Logger::default())
        .resource("/", |r| r.f(index))
        .resource("/index.html", |r| r.f(index))
        .default_resource(|r| {
                r.method(Method::GET).f(p404);

                r.route().filter(pred::Not(pred::Get())).f(
                    |_req| HttpResponse::MethodNotAllowed()
                );
        })
        .boxed()
}
