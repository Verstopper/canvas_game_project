//initiate express app
var express = require('express');
var app = express();

//display squaresGame.html when the root path is requested
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/squaresGame.html');
});

//display squaresGame.js when the path /squaresGame.js is requested
app.get('/squaresGame.js', function(req, res) {
  res.sendFile(__dirname + '/squaresGame.js');
});

//fetch sounds from the root path
app.use(express.static(__dirname));


//start the server
const port = process.env.PORT || "8001";
app.listen(port);
console.log(`server listening on port ${port}`);


