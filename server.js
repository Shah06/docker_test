'use strict';

// Constants
const express = require('express');
const mysql = require('mysql');
const PORT = 8080;
const HOST = 'node_app';

const SQL_HOST = 'mysql';
const SQL_USER = 'root';
const SQL_PORT = '3306';
const SQL_PASSWD = 'password';

let isSqlConnected = false;

const con = mysql.createConnection({
	host: SQL_HOST,
	user: SQL_USER,
	password: SQL_PASSWD
});

con.connect(function(err) {
	if (err) {
		console.log(err);
		isSqlConnected = false;
	} else {
		isSqlConnected = true;
		console.log("Connected to mysql");
	}
});

// App
const app = express();
app.get('/', (req, res) => {
 	res.send('Current server time: ' + new Date() + '\nConnected to MySQL: ' + isSqlConnected);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
