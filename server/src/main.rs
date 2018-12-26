extern crate server;

use fern::colors::{Color, ColoredLevelConfig};

fn main() {
    // std::env::set_var("RUST_LOG", "actix_web=info");
    // env_logger::init();
    let verbosity: u64 = 0;

    let colors = ColoredLevelConfig::new()
        .debug(Color::Magenta)
        .info(Color::Green)
        .trace(Color::BrightBlue);

    let level = match verbosity {
        0 => log::LevelFilter::Warn,
        1 => log::LevelFilter::Info,
        2 => log::LevelFilter::Debug,
        _3_or_more => log::LevelFilter::Trace,
    };

    fern::Dispatch::new()
        .chain(std::io::stdout())
        .level(level)
        .format(move |out, message, record| {
            out.finish(format_args!(
                "{} {}\t [{}] {}",
                chrono::Utc::now().format("%Y-%m-%d %H:%M:%S"),
                colors.color(record.level()),
                record.target(),
                message
            ))
        })
        .apply()
        .unwrap();

    server::run_server().expect("Failed to config server");
}
