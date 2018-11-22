#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub enum Commands {
    ManuelControl {
        on: bool,
        color: Option<[u8; 3]>,
        brightness: u8,
    },
}




#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_deserialize_manuel_conrol() {
        let data = include_str!("../../jsons/manuel_control.json");
        let command_is: Commands = serde_json::from_str(data).unwrap();
        let command_should = Commands::ManuelControl {
            on: true,
            color: Some([100, 20, 30]),
            brightness: 50,
        };

        assert_eq!(command_should, command_is);
    }
}
