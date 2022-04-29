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
        '{Brown: 245, Blue: 89, White: 30, Black: 50, Yellow: 20}', './images/ship.png'),
       ('Volcano', 14.99, 50, 'A small scale volcano with lava falling down its sides',
        '{Brown: 342, Gray: 150, Red: 50, Yellow: 45, Orange: 30}', './images/volcano.png'),
       ('Mountain', 12.25, 50, 'A grand mountain towering over your lego city', '{Gray: 500, White: 125, Black: 60}',
        './images/mountain.png'),
       ('Rainbow', 25.00, 50, 'A colourful rainbow to bring joy to all who see it',
        '{Red: 175, Orange: 155, Yellow: 135, Green: 115, Blue: 95, Purple: 75, Pink: 55}', './images/rainbow.png'),
       ('Ice Cream', 23.50, 50, 'A delicious looking ice cream to make your friends jealous',
        '{Brown: 176, Purple: 135, Green: 115, Yellow: 95, Blue: 70}', './images/icecream.png');

-- Down

DROP TABLE Kits
