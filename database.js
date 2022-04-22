import {open} from "sqlite";
import sqlite3 from 'sqlite3';

async function init() {
    const db = await open({filename: "./Lego_Database.sqlite", driver: sqlite3.Database});
    await db.migrate({migrationsPath: "./migrations"});
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

export async function searchStock(query, offset) {
    const db = await dbConn;
    query = "%" + query + "%";
    return db.all('SELECT * FROM Bricks WHERE name LIKE ? LIMIT 4 OFFSET ?', query, offset);
}

export async function restock() {
    const db = await dbConn;
    const stock = await db.all('SELECT * FROM Bricks');
    for (let item of stock) {
        await db.run('UPDATE Bricks SET stock=10000 WHERE name = ?', item.name);
    }
}

export async function returnBrickList(offset) {
    const db = await dbConn;
    return db.all('SELECT * FROM Bricks LIMIT 4 OFFSET ?', offset)
}
