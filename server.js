import * as db from './database.js';
import express from 'express';

const app = express();

app.use(express.static("webpage", {extensions: ['html']}));

function asyncWrap(func) {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next))
            .catch((e) => next(e || new Error()));
    };
}

async function findItem(req, res) {
    res.json(await db.findProduct(req.params.product));
}

async function showAllSingles(req, res) {
    res.json(await db.returnBrickList(((req.params.pageNum - 1) * 4)));
}

async function showAllKits(req, res) {
    res.json(await db.returnKitList(((req.params.pageNum - 1) * 4)));
}

async function searchStock(req, res) {
    res.json(await db.searchStock(req.params.query, ((req.params.pageNum - 1) * 4)));
}

async function adjustBrickStock(req, res) {
    await db.adjustStock(req.params.item, req.params.amount);
    res.sendStatus(200);
}

async function restock(req, res) {
    await db.restock();
    res.send("Shop Restocked!").status(200);
}

function sendConfig(req, res) {
    res.sendFile("auth_config.json", {root: '.'});
}

app.get('/productinfo/:product', asyncWrap(findItem));
app.get('/products/singles/:pageNum', asyncWrap(showAllSingles));
app.get('/products/kits/:pageNum', asyncWrap(showAllKits));
app.get('/search/:query/:pageNum', asyncWrap(searchStock))
app.get('/stock/:item/:amount', asyncWrap(adjustBrickStock));
app.get('/restock', asyncWrap(restock));
app.get('/auth_config.json', sendConfig);

console.log("Server Listening!");
app.listen(8080);
