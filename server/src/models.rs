pub mod sqlite;

pub use self::sqlite::*;

#[derive(Debug)]
pub enum DatabaseError {
    AlreadyExists,
    NotFound,
    CouldNotCrateNewEntry,
    SqliteError,
    UnknownError,
}

impl std::error::Error for DatabaseError {
    fn description(&self) -> &str {
        "use fmt::display()"
    }

    fn cause(&self) -> Option<&std::error::Error> {
        None
    }
}

impl std::fmt::Display for DatabaseError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            DatabaseError::AlreadyExists => {
                write!(f, "Value already exists in Database")
            }
            DatabaseError::NotFound => {
                write!(f, "Could not find entry")
            }
            DatabaseError::CouldNotCrateNewEntry => {
                write!(f, "Could not create new table entry")
            }
            DatabaseError::SqliteError => {
                write!(f, "SQLite Error")
            }
            DatabaseError::UnknownError => {
                write!(f, "Encounterd an unknown error")
            }
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Schedule {
    pub id: Option<i32>,
    pub device: String,
    pub integration: String,
    pub led_setting: LedSetting,
    pub activation_time: chrono::NaiveDateTime,
    pub active: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum LedMode {
    Default,
    Unknown,
}

impl From<LedMode> for i32 {
    fn from(item: LedMode) -> Self {
        match item {
            LedMode::Default => 0,
            _ => -1,
        }
    }
}

impl From<i32> for LedMode {
    fn from(item: i32) -> Self {
        match item {
            0 => LedMode::Default,
            _ => LedMode::Unknown,
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct LedSetting {
    pub mode: LedMode,
    pub color: [u8; 3],
}

impl From<DbSchedule> for Schedule {
    fn from(item: DbSchedule) -> Self {
        let led_setting = LedSetting {
            mode: item.color_mode.into(),
            color: [item.color_red as u8, item.color_green as u8, item.color_blue as u8],
        };

        Schedule {
            id: match item.schedule_id {
                -1 => None,
                x => Some(x),
            },
            device: item.device,
            integration: item.integration,
            led_setting,
            activation_time: item.activation_time,
            active: item.active,
        }

    }
}

impl From<DbSchedule> for NewSchedule {
    fn from(item: DbSchedule) -> Self {
        NewSchedule {
            device: item.device,
            integration: item.integration,
            color_mode: item.color_mode,
            color_red: item.color_red,
            color_green: item.color_green,
            color_blue: item.color_blue,
            activation_time: item.activation_time,
            active: item.active,
        }
    }
}

impl From<Schedule> for NewSchedule {
    fn from(item: Schedule) -> Self {
        DbSchedule::from(item).into()
    }
}

impl From<Schedule> for DbSchedule {
    fn from(item: Schedule) -> Self {
        DbSchedule {
            schedule_id: item.id.unwrap_or(-1),
            device: item.device,
            integration: item.integration,
            color_mode: item.led_setting.mode.into(),
            color_red: item.led_setting.color[0] as i32,
            color_green: item.led_setting.color[1] as i32,
            color_blue: item.led_setting.color[2] as i32,
            activation_time: item.activation_time,
            active: item.active,
        }
    }
}

use super::schema::schedules;

#[derive(Debug, Clone, Queryable, AsChangeset, Deserialize, Serialize)]
#[table_name="schedules"]
pub struct DbSchedule {
    pub schedule_id: i32,
    pub device: String,
    pub integration: String,
    pub color_mode: i32,
    pub color_red: i32, 
    pub color_green: i32,
    pub color_blue: i32,
    pub activation_time: chrono::NaiveDateTime,
    pub active: bool,
}

#[derive(Debug, Insertable, Deserialize, Serialize)]
#[table_name="schedules"]
pub struct NewSchedule {
    pub device: String,
    pub integration: String,
    pub color_mode: i32,
    pub color_red: i32, 
    pub color_green: i32,
    pub color_blue: i32,
    pub activation_time: chrono::NaiveDateTime,
    pub active: bool,
}