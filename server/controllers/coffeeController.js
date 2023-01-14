/**
 *   Information that we are receiving from the front-end (req.body):
 *   
 *   quality of meals (1 - 5)
 *   quality of drinks (1 - 5)
 *   space availability (1 - 5)
 *   parking availability (1 - 5)
 *   sound (1-5)
 *   wifi (1-5)
 * 
 *   has an outlet
 *   * ** ***  ->  * = 1 outlet , ** = 2 outlets, *** = 3 or more outlets
 * 
 * */


CREATE TABLE spots (
_id SERIAL PRIMARY KEY,
food INTEGER,
drinks INTEGER,
space INTEGER, 
sound INTEGER,
outlets INTEGER,
parking INTEGER,
wifi INTEGER
)

CREATE TABLE users (
    _id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL
    password VARCHAR
)

DROP TABLE spots

INSERT INTO spots (food, drinks, space, sound, outlets, parking, wifi)
VALUES (5, 3, 4, 1, 2, 4, 3)