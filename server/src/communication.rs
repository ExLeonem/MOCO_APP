#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub enum Commands {
    SimpleCommand {
        name: String,
    },
    LedStatus {
        on: bool,
        color: [u8; 3],
        brightness: u8,
    },
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
