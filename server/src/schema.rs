table! {
    schedules (schedule_id) {
        schedule_id -> Integer,
        device -> Text,
        integration -> Text,
        color_mode -> Integer,
        color_red -> Integer,
        color_green -> Integer,
        color_blue -> Integer,
        activation_time -> Timestamp,
        active -> Bool,
        running -> Bool,
    }
}
