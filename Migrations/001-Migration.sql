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
VALUES ('Single Red Brick', 0.05, 10000, 'A Single Red Brick', './images/placeholder.png'),
       ('Single Green Brick', 0.06, 10000, 'A Single Green Brick', './images/placeholder.png'),
       ('Single Blue Brick', 0.04, 10000, 'A Single Blue Brick', './images/placeholder.png'),
       ('Single White Brick', 0.03, 10000, 'A Single White Brick', './images/placeholder.png'),
       ('Single Black Brick', 0.03, 10000, 'A Single Black Brick', './images/placeholder.png'),
       ('Single Yellow Brick', 0.05, 10000, 'A Single Yellow Brick', './images/placeholder.png'),
       ('Single Purple Brick', 0.08, 10000, 'A Single Purple Brick', './images/placeholder.png'),
       ('Single Pink Brick', 0.06, 10000, 'A Single Pink Brick', './images/placeholder.png'),
       ('Single Gray Brick', 0.04, 10000, 'A Single Gray Brick', './images/placeholder.png');

/*
CREATE TABLE Kits
(
    id    CHAR(36) PRIMARY KEY,
    name  TEXT,
    price REAL,
    stock INTEGER,
    desc  TEXT,
    src   TEXT
);
  */

-- Down

Drop TABLE Bricks;

