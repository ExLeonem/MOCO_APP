# Structure

`src/lib.rs` the function `run_server()` starts the server.
 
`src/led.rs` and `src/led/...` contains light sources, `LedController` and the  `LedCache`.

`src/web.rs` and `src/web/...` contains the different api endpoints.

`src/models.rs` and src/models/...` contains code to transform types to be used by the database, api endpoints or by the server.

# Setup

To compile the server we need first to [install Rust](https://www.rust-lang.org/tools/install). If we want to run the server software on a Raspberry Pi it is possible to cross compile it, but the easiest way would be to just install Rust on it and compile it directly on the Raspberri Pi.

We also need to install the sqlite dev package:
```bash
$ sudo apt-get install libsqlite3-dev
```

Make sure that you are in the server directory and run the following bash command to start the server:
```bash
$ cargo run --release
```

# Configuration

The server can be configured through the `Rocket.toml` file. The default configuration will bind the server only to `localhost` and uses port `8080`.

The `light_source` can be changed to `"4pin"` to use a 4pin led strip. If this option is used we need to start the [pigpio daemon](http://abyz.me.uk/rpi/pigpio/pigpiod.html) before starting our server. It also needs a custom circuit to control the led strip which can be found [here](https://dordnung.de/raspberrypi-ledstrip/).

The following pins are used:

GPIO | Physical | Color
-----|----------|-----
17   | 11       | Red
22   | 15       | Green
24   | 18       | Blue
