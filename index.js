const express = require("express");
const app = express();

app.get('/', function(request, response) {
  response.send('test heroku deploy');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});