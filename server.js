var express = require('express');
var http = require('http');
var getClient = require('./getclient.js').getClient;
// var uuid = require('node-uuid');

var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static( __dirname + '/static' ));

// TODO: extend search to do ordering and limit
app.post('/query', function(req, res){
	console.log( "querying: " + req.body );
	var client = getClient();
	client.query(
		"select " + cslist( req.body.fields ) + " from " + req.body.table, 
		[], 
		function( err, results ) { 
			res.send( results );
			client.end();
	});
});

function cslist( arr ) {
	return arr.join(',');
}
app.listen(3000);
