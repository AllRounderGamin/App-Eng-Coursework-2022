const express = require('express');

const app = express();

app.use(express.static("Webpages", {extensions: ['html']}));

function redirects(req, res) {
    res.redirect("landing.html")
}

app.get("/", redirects)


console.log("Server Listening!");
app.listen(8080);
