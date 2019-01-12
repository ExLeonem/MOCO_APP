use super::Color;
use std::sync::mpsc::{Receiver, Sender};

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct DataDump {
    pub on: bool,
    pub color: Color,
    pub brightness: u8,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub enum Message {
    SimpleCommand { name: String },
    GetData,
    DataDump(DataDump),
    UpdateColor(Color),
    UpdateOn(bool),
    UpdateBrightness(u8),
    DataChanged,
    DatabaseChanged,
}

impl std::fmt::Display for Message {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Message::SimpleCommand { .. } => write!(f, "{}", "Message::SimpleCommand"),
            Message::GetData => write!(f, "{}", "Message::GetData"),
            Message::DataDump(_) => write!(f, "{}", "Message::DataDump"),
            Message::UpdateColor(_) => write!(f, "{}", "Message::UpdateColor"),
            Message::UpdateOn(_) => write!(f, "{}", "Message::UpdateOn"),
            Message::UpdateBrightness(_) => write!(f, "{}", "Message::UpdateBrightness"),
            Message::DataChanged => write!(f, "{}", "Message::DataChanged"),
            Message::DatabaseChanged => write!(f, "{}", "Message::DatabaseChanged"),
        }
    }
}

impl Message {
    pub fn get_dump(channel: &mut (Sender<Message>, Receiver<Message>)) -> DataDump {
        channel
            .0
            .send(Message::GetData)
            .expect("Couldn't send to Controller");
        let response = channel.1.recv().expect("Couldn't receive from Controller");
        match response {
            Message::DataDump(dump) => dump,
            _ => panic!("Couldn't get {}", response),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_deserialize_led_status() {
        let data = include_str!("../../jsons/led_status.json");
        let led_is: Commands = serde_json::from_str(data).unwrap();
        let led_should = Commands::LedStatus {
            on: true,
            color: [100, 20, 30],
            brightness: 50,
        };

        assert_eq!(led_should, led_is);
    }

    #[test]
    fn test_deserialize_simple_command_get_led_status() {
        let data = include_str!("../../jsons/simple_command_get_led_status.json");
        let command_is: Commands = serde_json::from_str(data).unwrap();
        let command_should = Commands::SimpleCommand {
            name: "get_led_status".to_owned(),
        };

        assert_eq!(command_should, command_is);
    }
}
