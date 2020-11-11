'use strict';

// Constants
const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const PORT = 8080;
const HOST = 'node_app';

const SQL_HOST = 'mysql';
const SQL_USER = 'root';
const SQL_PORT = '3306';
const SQL_PASSWD = 'password';
let isSqlConn = false;

const WEATHER_KEY = '97fa8fdde798392409ad1b20091e89fe';
const WEATHER_CITY = 'La Jolla, CA, US';
let apiPath = 'https://api.openweathermap.org/data/2.5/forecast?q='+WEATHER_CITY+'&appid='+WEATHER_KEY;
let weatherData = '';

function persistConnect() {

	const con = mysql.createConnection({
		host: SQL_HOST,
		user: SQL_USER,
		password: SQL_PASSWD
	});

	if (!isSqlConn) {
		
		con.connect(function(err) {
	
			if (err) {
				console.log(err);
				isSqlConn = false;
			} else {
				isSqlConn = true;
				console.log("Connected to mysql");
			}
		
		});

	}
}

console.log(apiPath);

axios.get(apiPath).then(res => {
		weatherData = res.data;
		console.log("Updated weatherData:\n" + weatherData);
}).catch(err => {
	console.log(err);
}).then(() => {
	// always run
});

// Attempt a DB connection every 1.5 second
setInterval(persistConnect, 1500);


// update La Jolla weather every 30 seconds
// setInterval(loadWeather, 30000);

// App
const app = express();

app.get('/', (req, res) => {
 	res.send('Current server time: ' + new Date() + '\nConnected to MySQL: ' + isSqlConn);
});

app.get('/weather', (req, res) => {
	console.log('sending weather data');
	res.send(weatherData);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
