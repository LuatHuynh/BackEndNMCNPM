const express = require('express');
const db = require('./config/db/server.js');
const app = express();
const port = 3000;
const route = require('./Routers/server');

// connect to DB
db.connect();

server.use(express.static(__dirname));
server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());

route(server);

server.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send("status code:" + statusCode + ": " + err.message);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})