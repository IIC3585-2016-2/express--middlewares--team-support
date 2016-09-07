var express = require('express');
var app = express();
var multer = require('multer'); // v1.0.5
var upload = multer();

/*##################################################################
	Hello World
*/
var requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

/* this method happens after de app.listen, why does that happen? */
app.get('/', (req, res) => {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});


/*##################################################################
	Call another js
*/
app.use('/viewdirectory', require('./mymiddleware.js'));


/*##################################################################
	Start sample server
*/

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


/*##################################################################
	Middleware function with no mount path 
*/
app.use( (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

/*	Middleware functions with a mount path. 
*/
app.use('/user/:id', 
 (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
},
 (req, res, next) => {
  res.send('USER');
  if (req.params.id == 0) {
  	app.get('/viewdirectory', require('./mymiddleware.js'));
  }
  else {
  	next();
  }
});

/*##################################################################
	Series of MW functions
*/
app.use('/series', (req, res, next) => {
  console.log('Request URL1:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type1:', req.method);
  next();
});

/*	Same as above put separated
*/
app.use('/notseries', (req, res, next) => {
  console.log('Request URL2:', req.originalUrl);
  next();
});

app.use('/notseries', (req, res, next) => {
  console.log('Request URL2:', req.originalUrl);
  next();
});