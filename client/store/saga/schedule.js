/**
 * Endpoints
 * 
 * Base URL: https://www.qqwa.de/sneaky/moco/api
 */

 import {ADD_SCHEDULE} from '../constants';


 // /api/v1/schedules (GET)
 /**
  * [
        {
            "activation_time": "2018-06-03T12:34:56.229",
            "active": true,
            "device": "test",
            "id": 2,
            "integration": "manuel",
            "led_setting": {
            "color": [
                100,
                20,
                10
            ],
            "mode": "Default"
            },
            "running": false
        },
        {
            "activation_time": "2018-05-03T12:34:00",
            "active": true,
            "device": "test",
            "id": 4,
            "integration": "manuel",
            "led_setting": {
            "color": [
                100,
                20,
                10
            ],
            "mode": "Default"
            },
            "running": false
        }
    ]
  */


// /api/v1/schedule/<id> (GET)
/**
 * {
    "activation_time": "2018-05-03T12:34:16.100",
    "active": false,
    "device": "test",
    "id": 4,
    "integration": "manuel",
    "led_setting": {
        "color": [
        100,
        20,
        10
        ],
        "mode": "Default"
    },
    "running": false
    }
 */



 // /api/v1/schedule (POST)
 /**
  * {
        "device": "test",
        "integration": "manuel",
        "led_setting" : {
                "mode": "Default",
                "color": [100, 20, 10]
            },
        "activation_time": "2021-06-03T12:34:00.000",
        "active": true
    }
  */



// /api/v1/schedule/<id> (DELETE)

// /api/v1/schedule/<id> (PUT)
/**
 * {
    "activation_time": "2018-05-03T12:34:00.000",
    "active": true,
    "device": "test",
    "integration": "manuel",
    "led_setting": {
        "color": [
            100,
            20,
            10
        ],
        "mode": "Default"
    }
 */
