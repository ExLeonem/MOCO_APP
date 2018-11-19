#[derive(Debug, Serialize, Deserialize)]
pub enum Commands {
    ManuelControl {
        on: bool,
        color: Option<[u8; 3]>,
    },
}

