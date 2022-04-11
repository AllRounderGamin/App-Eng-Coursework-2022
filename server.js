import * as db from './database.js';
import express from 'express';

const app = express();

app.use(express.static("webpages", {extensions: ['html']}));

function asyncWrap(func) {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next))
            .catch((e) => next(e || new Error()));
    };
}

async function findBrickInfo(req, res) {
    res.json(await db.findBrick(req.params.product));
}

async function showAllProducts(req, res) {
    res.json(await db.returnBrickList(((req.params.pageNum - 1) * 8)));
}

async function adjustBrickStock(req, res) {
    await db.adjustStock(req.params.brick, req.params.amount);
    res.sendStatus(200);
}

async function restock(req, res) {
    await db.restock();
    res.send("Shop Restocked!").status(200);
}

app.get('/productinfo/:product', asyncWrap(findBrickInfo));
app.get('/allproducts/:pageNum', asyncWrap(showAllProducts));
app.get('/stock/:brick/:amount', asyncWrap(adjustBrickStock));
app.get('/restock', asyncWrap(restock));

console.log("Server Listening!");
app.listen(8080);
