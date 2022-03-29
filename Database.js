import sqlite from "sqlite";

async function init() {
    const db = await sqlite.open("./Lego_Database.sqlite");
    await db.migrate({migrationsPath: "./Migrations"});
    return db;
}

const dbConn = init();


export async function findBrick(id) {
    const db = await dbConn;
    return db.get('SELECT * FROM Bricks WHERE id = ?', id);
}

// could also use npm nanoid or uuid-random instead of relying off of name
