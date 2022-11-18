const express = require('express');
const db = require('./config/db/server.js');
const app = express();
const port = 3000;
const Good = require('./models/Goods.m')

// connect to DB
db.connect();

app.get('/', (req, res) => {

    Good.find({}, function (err, goods){
        if (!err){
            console.log(goods[0]);
            res.json(goods);
        }
        else{
            res.status(400).json({error: 'error!'});
        }
    })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})