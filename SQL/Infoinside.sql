USE college_events;
INSERT INTO colleges (name)
VALUES
('Conestoga College'),
('Waterloo University');
INSERT INTO users (email, college_id, last_name)
VALUES
('aaron@email.com', 1, 'Sieunarine'),
('thebestemail@email.com', 2, 'Smith');
INSERT INTO events (college_id, title)
VALUES
(1, 'Game Event fair'),
(2, 'Tech Presentation');
INSERT INTO event_registrations (event_id, user_id)
VALUES
(1, 1),
(2, 2);
USE college_events;

ALTER TABLE users
ADD COLUMN password VARCHAR(255) NOT NULL AFTER email;
