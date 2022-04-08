import {open} from "sqlite";
import sqlite3 from 'sqlite3';

async function init() {
    const db = await open({filename: "./Lego_Database.sqlite", driver: sqlite3.Database});
    await db.migrate({migrationsPath: "./Migrations"});
    return db;
}

const dbConn = init();


export async function findBrick(name) {
    const db = await dbConn;
    return db.get('SELECT * FROM Bricks WHERE name = ?', name);
}

export async function adjustStock(brickName, amount) {
    const db = await dbConn;
    const brick = await findBrick(brickName);
    const newStock = brick.stock - amount;
    await db.run('UPDATE Bricks SET stock=? WHERE name = ?', newStock, brick.name);
}

export async function restock() {
    const db = await dbConn;
    const stock = await db.all('SELECT * FROM Bricks');
    for (let item of stock) {
        await db.run('UPDATE Bricks SET stock=1000 WHERE name = ?', item.name);
    }
}

export async function returnBrickList(offset) {
    const db = await dbConn;
    return db.all('SELECT * FROM Bricks LIMIT 8 OFFSET ?', offset)
}

// could also use npm nanoid or uuid-random instead of relying off of name
