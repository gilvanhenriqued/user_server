const sqlite = require('sqlite3');
const jwt = require('jsonwebtoken');
const express = require('express');
const crypto = require('crypto');

// app express initializate 
const app = express();

// DB initializate
const db = new sqlite.Database("users.sqlite3");

const KEY = "my y(!!1!11!)<'SECRET>Key'!";

// signup route
app.post('/signup', express.urlencoded(), function(req, res){
  let username = req.body.username;
  let password = req.body.password; 

  password = crypto.createHash('sha256')
    .update(password)
    .digest('hex');
      
  db.get("SELECT FROM users WHERE username = ?", + [username], function(err, row){
    if(row != undefined) {
      console.error("Can't create user " + username);
      res.status(409);
      res.send("An user with that username already exists.");
    } else {
      console.log("Can create user " + username);
      db.run('INSERT INTO users(username, password) VALUES (?,?)', [username, password]);
      res.status(201);
      res.send("Sucess");
    }
  }); 
});


