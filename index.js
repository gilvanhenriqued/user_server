const sqlite = require('sqlite3');
const jwt = require('jsonwebtoken');
const express = require('express');
const crypto = require('crypto');

// app express initializate 
const app = express();

// DB initializate
const db = new sqlite.Database("users.sqlite3");

const KEY = "my y(!!1!11!)<'SECRET>Key'!";

// server port run
let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log("User authentication server lintening on port " + port);
})

// signup route
app.post('/signup', express.urlencoded(), (req, res) => {
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

// login route
app.post('/login', express.urlencoded(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password; 
  console.log(username + " attempted login...");

  password = crypto.createHash('sha256')
    .update(password)
    .digest('hex');

  db.get("SELECT * FROM users WHERE (username,password) = (?,?)", 
    [username, password], function(err, row) {
      if(row != undefined) {
        let payload = {
          username: username
        }

        let token = jwt.sign(payload, KEY, {
          algorithm: 'HS256',
          expiresIn: "5d"
        });
        console.log("Sucess");
        res.send(token);
      } else {
        console.error("Failure");
        res.status(401);
        res.send("There's no user matching that.");
      }
    });
});

// data access route
app.get('/data', (req, res) => {
  let str = req.get('Authorization');
  try {
    jwt.verify(str, KEY, {algorithm: 'HS256'});
    res.send("Very Secret Data");
  } catch {
    res.status(401);
    res.send("Bad Token");
  }
});
