/*
	Printing a bill
*/var express = require('express');
var app = express();
var receipt = "";
var receiptNumber = 0;

var printer = function(req,res,next){
	res.send(receipt);
};

//Header decorator
var addHeader = function(req, res,next)
{
	receipt = "";
	receipt = receipt + "*******Printing Ticket*******";
	next();
}
//Receipt Number decorator
var addReceiptNumber = function(req,res,next)
{
	receipt = receipt + "</br><br>			Ticket number: " + receiptNumber;
	receiptNumber++;
	next();
}
//Location decorator
var addLocation = function(req,res,next)
{
	receipt = receipt + "</br>			Location: Santiago";
	next();
}
//Total decorator
var addTotal = function(req,res,next)
{
	receipt = receipt + "</br><br>			Total: $10000";
	next();
}
//Footer decorator
var addFooter = function(req,res,next)
{
	receipt = receipt + "</br><br>**************************";
	next();
}
app.use(function (req, res, next) {
	if(req.url != '/favicon.ico')
	{
		next();
	}
});

app.use(addHeader);
app.use(addReceiptNumber);
app.use(addLocation);
app.use(addTotal);
app.use(addFooter);

app.use(printer);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
