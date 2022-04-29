import {open} from "sqlite";
import sqlite3 from 'sqlite3';

async function init() {
    const db = await open({filename: "./Lego_Database.sqlite", driver: sqlite3.Database});
    await db.migrate({migrationsPath: "./migrations"});
    return db;
}

const dbConn = init();


export async function findProduct(name) {
    const db = await dbConn;
    const brickSearch = await db.get('SELECT * FROM Bricks WHERE name = ?', name);
    if (brickSearch) {
        return brickSearch;
    } else
        return db.get('SELECT * FROM Kits WHERE name = ?', name);
}

export async function adjustStock(brickName, amount) {
    const db = await dbConn;
    const item = await findProduct(brickName);
    const newStock = item.stock - amount;
    await db.run('UPDATE Bricks SET stock = ? WHERE name = ?', newStock, item.name);
    await db.run('UPDATE Kits SET stock = ? WHERE name = ?', newStock, item.name);
}

export async function searchStock(query, offset) {
    const db = await dbConn;
    query = "%" + query + "%";
    return db.all('SELECT * FROM Bricks WHERE name LIKE ? LIMIT 4 OFFSET ?', query, offset);
}

export async function restock() {
    const db = await dbConn;
    const bricks = await db.all('SELECT * FROM Bricks');
    for (let item of bricks) {
        await db.run('UPDATE Bricks SET stock=10000 WHERE name = ?', item.name);
    }
    const kits = await db.all('SELECT * FROM Kits');
    for (let item of kits) {
        await db.run('UPDATE Kits SET stock=50 WHERE name = ?', item.name);
    }
}

export async function returnBrickList(offset) {
    const db = await dbConn;
    return db.all('SELECT * FROM Bricks LIMIT 4 OFFSET ?', offset);
}

export async function returnKitList(offset) {
    const db = await dbConn;
    return db.all('SELECT * FROM Kits LIMIT 4 OFFSET ?', offset);
}
