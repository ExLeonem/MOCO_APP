pub mod cache;
pub mod controller;
pub mod message;

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
    }

    fn color(&self) -> Color {
        self.color
    }

    fn set_on(&mut self, on: bool) {
        self.on = on;
    }

    fn on(&self) -> bool {
        self.on
    }

    fn set_brightness(&mut self, brightness: u8) {
        self.brightness = brightness;
    }

    fn brightness(&self) -> u8 {
        self.brightness
    }

    fn manuel(&self) -> bool {
        self.manuel
    }

    fn set_manuel(&mut self, manuel: bool) {
        self.manuel = manuel
    }
}
