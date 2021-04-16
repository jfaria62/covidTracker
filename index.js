const express = require('express')
const https = require('https')

selectedDate = '20200501'//date must be in yyyymmdd format

const current = 'https://api.covidtracking.com/v1/us/current.json'
const historic = 'https://api.covidtracking.com/v1/us/daily.json'
const date = 'https://api.covidtracking.com/v1/us/'+ selectedDate + '.json'

https.get('https://api.covidtracking.com/v1/us/current.json', (res) =>{
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

}).on('error', (e) => {
  console.error(e);
});