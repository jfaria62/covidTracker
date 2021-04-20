const express = require('express')
const app = express()
const path = require('path')
const https = require('https')
const server = require('http').createServer(app)
const io = require('socket.io')(server)


//date must be in yyyymmdd format for the api
selectedDate = '20210101'
//set ma to default state
selectedState = 'ma'
//set strings for api calls
const baseURL = 'https://api.covidtracking.com/v1/'
const current = 'us/current.json'
const historic = 'us/daily.json'
const date = 'us/'+ selectedDate + '.json'
const stateMetadata = 'states/' + selectedState + '/info.json'
const stateData = 'states/' + selectedState + '/current.json'
const histStateData = 'states/' + selectedState + '/daily.json'


const port = process.env.PORT || 3000
server.listen(port)
app.use(express.urlencoded({extended:false}), express.static('public'))

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public/main.html'))
})

io.on('connection', (socket)=>{  
  console.log("New Connection")
  socket.emit('status', 'Connection done')
  //set default data to client
  getCovidData(baseURL+ current)
})


function getCovidData(apiString){  
  console.log(apiString)
  
  https.get(apiString, res =>{
    let data = ''
    res.on('data', d => {
      //build data with chunks
      data += d
    })
    
    res.on('end', () =>{
      let covidData = JSON.parse(data)
      //SEND THE DATA TO THE CLIENT SIDE HERE
      io.emit('send data', covidData)
    })
  }).on('error', (e) => {
    console.error("Error: ", e.message);
  });
}
