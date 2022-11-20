const express = require('express');
const db = require('./config/db/server.js');
const server = express();
const port = 3000;
const route = require('./Routers/server');
const canteenSchedule = require('./config/db/schedule');

// connect to DB
db.connect();

server.use(express.static(__dirname));
server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());

canteenSchedule.run();

route(server);

server.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send("status code:" + statusCode + ": " + err.message);
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})