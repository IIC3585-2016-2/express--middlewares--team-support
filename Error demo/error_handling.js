/*
	Demo that shows how to handle errors
*/

var express = require('express');
var app = express();

app.get('/', function (req, res,next) {
  res.send('Hello World!');
});

app.get('/admin', function(req,res,next) {
	var err = new Error();
  err.status = 401;
	err.url = req.url;
  next(err);
});

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
	err.url = req.url;
  next(err);
});


// handling 404 errors
app.use(function(err, req, res, next) {

  if(err.status == 404 ) {
    res.send("<h1>Error 404 - " + err.url + " Not found</h1>");
  }
	else if(err.status == 401)
	{
		res.write("<h1>Error 401 - Unauthorized</h1>");
		res.write("You are not authorized to access "+ err.url);
	}
  else {
		next();
	}
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
