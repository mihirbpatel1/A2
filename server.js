'use strict';

// load package
const express = require('express');
const { json } = require("body-parser");
const fs = require('fs');



const app = express();

app.use(json());

app.post('/postmessage', (req, res) => {
    var fileanme = 'posts.txt'

    const { topic, data, time = new Date().toISOString() } = req.body;
    fs.appendFileSync(fileanme, `${topic}, ${data}, ${time}\n`);

    res.send('done');
});

app.get("/getmessage", (req, res) => {
    fs.promises.readFile('./posts.txt', { encoding: 'utf8' })
        .then(content => res.send(content));
})
app.use('/', express.static('./'));


app.listen(8080,function(){
  console.log(`Now listening on `);
});

