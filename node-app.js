'use strict';
var express = require('express');
var rs = require('request');

var http = require('http');
var path = require('path');

var serviceIp = process.env.SERVICE_IP || '127.0.0.1';
var port = process.env.PORT || '8000';

var app = express();

app.set('port', port);
app.use(express.static(path.join(__dirname, 'dist', 'my-house-ui')));

app.get('/api/*', function(request, response) {

    var newUrl = 'https://' + serviceIp + request.url.slice(4);
    console.log(newUrl);
    rs({method: "GET",
      "rejectUnauthorized": false,
      "url": newUrl,
      "headers" : {"Content-Type": "application/json"}})
      .pipe(response);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
