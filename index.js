const sqlite = require('sqlite3');
const jwt = require('jsonwebtoken');
const express = require('express');
const crypto = require('crypto');

// app express initializate 
const app = express();

// DB initializate
const db = new sqlite.Database("users.sqlite3");

const KEY = "my y(!!1!11!)<'SECRET>Key'!";

