const express = require('express');

const app = express();

app.use(express.static("Webpages", {extensions: ['html']}));

console.log("Server Listening!");
app.listen(8080);
