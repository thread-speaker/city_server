var fs = require('fs');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/static', express.static(__dirname + '/static'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/getcity', function(req, res, next) {
	fs.readFile(__dirname + '/static/cities.txt',function(err,data) {
		if(err) throw err;
		else if(!req.query.q) res.status(400).send('you need a search parameter "q"');
		else {
			var myRe = new RegExp("^" + req.query.q.charAt(0).toUpperCase());
			var readCities = [];
			var cities = data.toString().split("\n");
			for(var i = 0; i < cities.length; i++) {
				var result = cities[i].search(myRe);
				if (result != -1) {
					readCities.push({city: cities[i]});
				}
			}

			console.log(readCities);
			res.json(readCities);
		}
	});
});
