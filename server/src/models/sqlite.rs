use diesel::prelude::*;
use super::*;

type Result<T> = std::result::Result<T, DatabaseError>;


impl DbSchedule {
    pub fn add(conn: &diesel::SqliteConnection, new_schedule: NewSchedule) -> Result<DbSchedule> {
        let schedule = DbSchedule::get_by_activation_time(&*conn, &new_schedule.activation_time);

        if let Ok(_) = schedule {
            return Err(DatabaseError::AlreadyExists);
        }

        let _rows = diesel::insert_into(crate::schema::schedules::table)
            .values(&new_schedule)
            .execute(&*conn);
        
        let schedule = DbSchedule::get_by_activation_time(&*conn, &new_schedule.activation_time);

        schedule
    }

    pub fn delete(conn: &diesel::SqliteConnection, id: i32) -> Result<()> {
        use crate::schema::schedules::dsl::*;
        let rows = diesel::delete(schedules.find(id)).execute(conn);
        match rows {
            Ok(rows) => {
                if rows == 1 {
                    Ok(())
                } else {
                    Err(DatabaseError::NotFound)
                }
            }
            Err(_) => {
                Err(DatabaseError::SqliteError)
            }
        }
    } 

    pub fn get_by_activation_time(conn: &diesel::SqliteConnection, activation_time_: &chrono::NaiveDateTime) -> Result<DbSchedule> {
        use crate::schema::schedules::dsl::*;
        // check if device exists already
        let found_schedules = schedules.filter(activation_time.eq(activation_time_)).load::<DbSchedule>(&*conn);

        match found_schedules {
            Ok(found_schedules) => {
                if found_schedules.len() != 0 {
                    Ok(found_schedules[0].clone())
                } else {
                    Err(DatabaseError::NotFound)
                }
            }
            Err(_) => {
                Err(DatabaseError::SqliteError)
            }
        }
    }

    pub fn update(conn: &SqliteConnection, id: i32, mut schedule: DbSchedule) -> Result<Schedule> {
        use crate::schema::schedules::dsl::*;
        schedule.schedule_id = id;
        let row = diesel::update(schedules.find(id))
            .set(&schedule)
            .execute(conn);

        match row {
            Ok(_) => {
                match DbSchedule::get_by_activation_time(&*conn, &schedule.activation_time) {
                    Ok(schedule) => Ok(schedule.into()),
                    Err(e) => Err(e),
                }
            }
            Err(_) => {
                Err(DatabaseError::SqliteError)
            }
        }

    }

    pub fn get(conn: &diesel::SqliteConnection, id: i32) -> Result<Schedule> {
        use crate::schema::schedules::dsl::*;
        let schedule = schedules.filter(schedule_id.eq(id)).load::<DbSchedule>(conn);

        match schedule {
            Ok(schedule) => {
                if schedule.len() == 1 {
                    Ok(schedule[0].clone().into())
                } else {
                    Err(DatabaseError::NotFound)
                }
            },
            Err(_) => Err(DatabaseError::SqliteError),
        }
    }

    pub fn get_all(conn: &diesel::SqliteConnection) -> Result<Vec<DbSchedule>> {
        use crate::schema::schedules::dsl::*;
        let found_schedules = schedules.load::<DbSchedule>(&*conn);

        match found_schedules {
            Ok(found_schedules) => Ok(found_schedules),
            Err(_) => Err(DatabaseError::SqliteError),
        }
    }

}