const express = require('express');

const app = express();

app.use(express.static("Webpages", {extensions: ['html']}));

function redirect(req, res) {
    const page = req.params.page;
    res.redirect("/");
}

app.get('/:page', redirect)


console.log("Server Listening!");
app.listen(8080);
