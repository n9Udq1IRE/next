var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	app.get('/', function(req, res){
	  res.send('Hello');
	});

	/* order */
	app.post('/order', upload.array(), function (req, res, next) {
		console.log('in  : ' + JSON.stringify(req.body));
		var ret = { "total": 0.00 };
		// Taxe
		var codeCountry = '';
		if (req.body.country !== undefined) {
			codeCountry = req.body.country;
		}
		else {
			console.log('WARNING : country=undefined');
		}
		var taxeCountry = getTaxeCountry(codeCountry);
		console.log('taxeCountry  : ' + JSON.stringify(taxeCountry));
		if (req.body.prices !== undefined && req.body.quantities !== undefined) {
			if (req.body.prices.length === req.body.quantities.length) {
				var index = 0;
				while (index < req.body.prices.length) {
					var sousTotal = req.body.prices[index] * req.body.quantities[index];
					sousTotal = sousTotal + (sousTotal * taxeCountry) / 100;
					ret.total += sousTotal;
					index++;
				}
			}
			else {
				console.log('WARNING : reduction=undefined');
			}
		}
		else {
			console.log('ERROR : prices=undefined OR quantities=undefined');
		}
		// Reduction
		var reduction = 0;
		var typeReduction = '';
		if (req.body.reduction !== undefined) {
			typeReduction = req.body.reduction;
		}
		else {
			console.log('WARNING : reduction=undefined');
		}
		switch (typeReduction) {
			case 'STANDARD':
			if (ret.total >= 1000)
				reduction = 3;
			if (ret.total >= 5000)
				reduction = 5;
			if (ret.total >= 7000)
				reduction = 7;
			if (ret.total >= 10000)
				reduction = 10;
			if (ret.total >= 50000)
				reduction = 15;
				break;
			default:
		}
		console.log('reduction  : ' + JSON.stringify(reduction));
		ret.total = ret.total - (ret.total * reduction) / 100
		// Arrondi 2
		ret.total = ret.total.toFixed(2);
		console.log('out : ' + JSON.stringify(ret));
	  res.send(ret);
		res.end();
	});

	var taxes = { "DE": 20, "UK": 21, "FR": 20, "IT": 25, "ES": 19, "PL": 21, "RO": 20, "NL": 20, "BE": 24, "EL": 20, "CZ": 19, "PT": 23, "HU": 27, "SE": 23, "AT": 22, "BG": 21, "DK": 21, "FI": 17, "SK": 18, "IE": 21, "HR": 23, "LT": 23, "SI": 24, "LV": 20, "EE": 22, "CY": 21, "LU": 25, "MT": 20 };

	/* getTaxeCountry */
	function getTaxeCountry(codeCountry) {
		var taxe = 0;
		if (taxes[codeCountry] !== undefined) {
			taxe = taxes[codeCountry];
		}
		else {
			console.log('ERROR : getTaxeCountry.codeCountry=' + codeCountry);
		}

		return taxe;
	}

	/* feedback */
	app.post('/feedback', upload.array(), function (req, res, next) {
		console.log('feedback : ' + JSON.stringify(req.body));
	  res.end();
	});

	app.listen(1337);
