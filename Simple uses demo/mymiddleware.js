var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//mymiddleware.js
module.exports = (req, res) => {
  res.send('The views directory is ' + req.app.get('views'));
}

app.post('/profile', upload.array(), (req, res, next) => {
  console.log('req body, mw:' + req.body);
  //res.json(req.body);
  res.send('profile!!!!!!!!!!!!!!');
});