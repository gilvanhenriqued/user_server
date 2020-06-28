const sqlite = require('sqlite3');

const db = new sqlite.Database("users.sqlite3");

db.run(
  `CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL
  )`
);

db.close();