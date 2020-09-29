const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}!`));
const Discord = require('discord.js');
const client = new Discord.Client();
const bot = require('./bot')(client)
client.login('') //TOKEN HERE