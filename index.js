var sqlite = require('sqlite3');
var jwt = require('jsonwebtoken');
var express = require('express');
var crypto = require('crypto');

// app express initializate 
var app = express();

// DB initializate
var db = new sqlite.Database("users.sqlite3");