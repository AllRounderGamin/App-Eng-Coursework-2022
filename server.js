const express = require('express');

const app = express();

app.use(express.static("Webpages", {extensions: ['html']}));

function asyncWrap(func) {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next))
            .catch((e) => next(e || new Error()));
    };
}

console.log("Server Listening!");
app.listen(8080);


// make function async, call by app.get(asyncWrap(functionName)
