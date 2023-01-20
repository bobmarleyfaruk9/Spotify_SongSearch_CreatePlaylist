
const express = require('express') //express framework


const request = require('request'); // "Request" library

const http = require('http')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT

//Client id and secret is acquired from the spotify developer website
var client_id = '174df27b617a407e84e4d513c519a850'
var client_secret = 'f3d0ae63e9104e4b9de67cd247bd7116'

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get(['/mytunes.html', '/mytunes', '/index.html', '/'], (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})


app.get('/search', (req, response1) => {
  let songNameFromUrl = req.query.term
  let SongName = ""
  
  for(let i=0; i<songNameFromUrl.length; i++){
    if (songNameFromUrl.charAt(i) === " ") {
      //Fill up the spaces so url works
      SongName+="%20"
    }
    else SongName += songNameFromUrl.charAt(i) 
  }
  const titleWithPlusSigns = SongName

 //I have referenced this segment from offical Spotify documents
 //https://github.com/spotify/web-api-auth-examples/blob/master/client_credentials/app.js

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/search?q=${titleWithPlusSigns}&type=track&market=ES&limit=20&offset=5`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        //Send the acquired song info to server
        response1.contentType('application/json').json(body)
      });
    }
  });
}) 

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
  
    console.log(`http://localhost:3000`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000/mytunes.html`)
    console.log(`http://localhost:3000/mytunes`)
    console.log(`http://localhost:3000/index.html`)
  }
})
