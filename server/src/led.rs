pub mod cache;
pub mod controller;
pub mod message;

use std::process::Command;

const RED_PIN: u32 = 17;
const GREEN_PIN: u32 = 22;
const BLUE_PIN: u32 = 24;

type Color = [u8; 3];

pub trait LedControls {
    fn set_color(&mut self, color: Color);
    fn color(&self) -> Color;
    fn set_on(&mut self, on: bool);
    fn on(&self) -> bool;
    fn set_brightness(&mut self, brightness: u8);
    fn brightness(&self) -> u8;
    fn manuel(&self) -> bool;
    fn set_manuel(&mut self, manuel: bool);
}

pub struct LedStrip {
    color: Color,
    brightness: u8,
    on: bool,
    manuel: bool,
}

impl LedStrip {
    pub fn new() -> Self {
        LedStrip {
            color: [100, 100, 100],
            brightness: 100,
            on: false,
            manuel: false,
        }
    }

    fn update(&mut self) {
        if self.on {
            let color_max = self.color[0].max(self.color[1].max(self.color[2])) as f32;
            let mut red = (self.color[0] as f32 / color_max) * self.brightness() as f32;
            let mut green = (self.color[1] as f32 / color_max) * self.brightness() as f32;
            let mut blue = (self.color[2] as f32 / color_max) * self.brightness() as f32;
            if red < 0.0 {
                red = 0.0;
            }
            if green < 0.0 {
                green = 0.0;
            }
            if blue < 0.0 {
                blue = 0.0;
            }
            LedStrip::do_colors(red as u32, green as u32, blue as u32);
        } else { 
            LedStrip::do_colors(0, 0, 0);
        }
    }

    fn do_colors(red: u32, green: u32, blue: u32) {
        LedStrip::call_pigs(RED_PIN, red);
        LedStrip::call_pigs(GREEN_PIN, green);
        LedStrip::call_pigs(BLUE_PIN, blue);
    }

    fn call_pigs(pin: u32, value: u32) {
        Command::new("pigs")
            .arg("p")
            .arg(pin.to_string())
            .arg(value.to_string())
            .spawn()
            .expect("Failed to update pin");
    }
}

impl LedControls for LedStrip {
    fn set_color(&mut self, color: Color) {
        if self.color == color {
            return;
        }
        self.color = color;
        self.update();
        log::trace!("Updated color: {:?}", color);
    }

    fn color(&self) -> Color {
        self.color
    }

    fn set_on(&mut self, on: bool) {
        if self.on == on {
            return;
        }
        self.on = on;
        self.update();
        log::trace!("Updated on: {}", on);
    }

    fn on(&self) -> bool {
        self.on
    }

    fn set_brightness(&mut self, brightness: u8) {
        if self.brightness() == brightness {
            return;
        }
        self.brightness = brightness;
        self.update();
        log::trace!("Updated brightness: {}", brightness);
    }

    fn brightness(&self) -> u8 {
        self.brightness
    }

    fn manuel(&self) -> bool {
        self.manuel
    }

    fn set_manuel(&mut self, manuel: bool) {
        self.manuel = manuel;
        log::trace!("Updated manuel: {}", manuel);
    }
}


/// Mockup of a LedStrip for testing purposes
pub struct MocLedStrip {
    color: Color,
    brightness: u8,
    on: bool,
    manuel: bool,
}

impl MocLedStrip {
    pub fn new() -> Self {
        MocLedStrip {
            color: [100, 100, 100],
            brightness: 100,
            on: false,
            manuel: false,
        }
    }
}

impl LedControls for MocLedStrip {
    fn set_color(&mut self, color: Color) {
        self.color = color;
        log::trace!("Updated color: {:?}", color);
    }

    fn color(&self) -> Color {
        self.color
    }

    fn set_on(&mut self, on: bool) {
        self.on = on;
        log::trace!("Updated on: {}", on);
    }

    fn on(&self) -> bool {
        self.on
    }

    fn set_brightness(&mut self, brightness: u8) {
        self.brightness = brightness;
        log::trace!("Updated brightness: {}", brightness);
    }

    fn brightness(&self) -> u8 {
        self.brightness
    }

    fn manuel(&self) -> bool {
        self.manuel
    }

    fn set_manuel(&mut self, manuel: bool) {
        self.manuel = manuel;
        log::trace!("Updated manuel: {}", manuel);
    }
}
