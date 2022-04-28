-- Up

CREATE TABLE Kits
(
    name   TEXT PRIMARY KEY,
    price  REAL,
    stock  INTEGER,
    desc   TEXT,
    bricks TEXT,
    src    TEXT
);

INSERT INTO Kits
VALUES ('Pirate Ship', 16.50, 50, 'A small pirate ship sailing on the seas',
        '{Brown: 245, Blue: 89, White: 30, Black: 50, Yellow: 20}', './webpage/placeholder.png'),
       ('Volcano', 14.99, 50, 'A small scale volcano with lava falling down its sides',
        '{Brown: 342, Gray: 150, Red: 50, Yellow: 45, Orange: 30}', './images/placeholder.png'),
       ('Mountain', 12.25, 50, 'A grand mountain towering over your lego city', '{Gray: 500, White: 125, Black: 60}',
        './images/placeholder.png'),
       ('Rainbow', 25.00, 50, 'A colourful rainbow to bring joy to all who see it',
        '{Red: 175, Orange: 155, Yellow: 135, Green: 115, Blue: 95, Purple: 75, Pink: 55}', './placeholder.png');

-- Down

DROP TABLE Kits
