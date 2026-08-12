CREATE DATABASE college_events;
USE college_events;
CREATE TABLE colleges (
    college_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    college_id INT,
    last_name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (college_id)
    REFERENCES colleges(college_id)
);
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT,
    title VARCHAR(255),

    FOREIGN KEY (college_id)
    REFERENCES colleges(college_id)
);
CREATE TABLE event_registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    user_id INT,

    FOREIGN KEY (event_id)
    REFERENCES events(event_id),

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
);
