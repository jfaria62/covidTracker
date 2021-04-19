const express = require('express')
const app = express()
const path = require('path')
const https = require('https')


//date must be in yyyymmdd format for the api
selectedDate = '20210101'
//set ma to default state
selectedState = 'ma'
//set strings for api calls
const current = 'https://api.covidtracking.com/v1/us/current.json'
const historic = 'https://api.covidtracking.com/v1/us/daily.json'
const date = 'https://api.covidtracking.com/v1/us/'+ selectedDate + '.json'
const stateMetadata = ' https://api.covidtracking.com/v1/states/' + selectedState + '/info.json'
const stateData = ' https://api.covidtracking.com/v1/states/' + selectedState + '/current.json'
const histStateData = ' https://api.covidtracking.com/v1/states/' + selectedState + '/daily.json'

const port = process.env.PORT || 3000


let apiString = current
let data = getCovidData(apiString)
console.log(data)
app.use(express.urlencoded({extended:false}))

app.listen(port, ()=>{
  console.log(`Server Listening on port ${port}`)
})

//get main page

app.get('/', (req,res)=>{
  console.log(data)
  res.sendFile(path.join(__dirname, '/public/main.html'))
})
//app.post


function getCovidData(apiString){  
  https.get(apiString, (res) =>{
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
      return d;
    });
  
  }).on('error', (e) => {
    console.error(e);
  });
}