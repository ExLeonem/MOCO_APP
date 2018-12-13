CREATE TABLE schedules (
    schedule_id INTEGER NOT NULL PRIMARY KEY,
    device TEXT NOT NULL,
    integration TEXT NOT NULL,
    color_mode INTEGER NOT NULL,   -- hard coded options
    color_red INTEGER NOT NULL,
    color_green INTEGER NOT NULL,
    color_blue INTEGER NOT NULL,
    activation_time DATETIME NOT NULL UNIQUE,
    active BOOLEAN NOT NULL
);

