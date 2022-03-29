-- Up

CREATE TABLE Bricks
(
    id    CHAR(36) PRIMARY KEY,
    name  TEXT,
    price REAL,
    stock INTEGER,
    desc  TEXT,
    src   TEXT
);

CREATE TABLE Kits
(
    id    CHAR(36) PRIMARY KEY,
    name  TEXT,
    price REAL,
    stock INTEGER,
    desc  TEXT,
    src   TEXT
);

-- Drop

Drop TABLE Bricks;

