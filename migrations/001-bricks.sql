-- Up

CREATE TABLE Bricks
(
    name  TEXT PRIMARY KEY,
    price REAL,
    stock INTEGER,
    desc  TEXT,
    src   TEXT
);

INSERT INTO Bricks
VALUES ('Single Red Brick', 0.05, 10000, 'A Single Red Brick', './images/red_brick.png'),
       ('Single Green Brick', 0.06, 10000, 'A Single Green Brick', './images/green_brick.png'),
       ('Single Blue Brick', 0.04, 10000, 'A Single Blue Brick', './images/blue_brick.png'),
       ('Single White Brick', 0.03, 10000, 'A Single White Brick', './images/white_brick.png'),
       ('Single Black Brick', 0.03, 10000, 'A Single Black Brick', './images/black_brick.png'),
       ('Single Yellow Brick', 0.05, 10000, 'A Single Yellow Brick', './images/yellow_brick.png'),
       ('Single Purple Brick', 0.08, 10000, 'A Single Purple Brick', './images/purple_brick.png'),
       ('Single Pink Brick', 0.06, 10000, 'A Single Pink Brick', './images/pink_brick.png'),
       ('Single Gray Brick', 0.04, 10000, 'A Single Gray Brick', './images/gray_brick.png');

-- Down

Drop TABLE Bricks;

