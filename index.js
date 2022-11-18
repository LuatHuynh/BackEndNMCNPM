const express = require('express');
const cors = require('cors');
const app = express();
const {mongoConnection} = require('./src/Database');
const {PORT} = require('./src/Config');
const morgan = require('morgan');
require('dotenv').config();
var bodyParser = require('body-parser');

(async()=>{
    app.use(bodyParser.json());
    app.use(cors());
    app.use(morgan("common"));


    // connect to mongodb
    await mongoConnection();

    const port = PORT || 5000;
    app.listen(port, () => {
        console.log(`Sever is running on port ${port}`);
    })
})()