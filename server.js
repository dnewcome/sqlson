var express = require('express');
var norm = require('./norm');
var disjoin = require('./to_json-join').disjoin_set;
var getClient = require('./getclient.js').getClient;

var app = express.createServer();
app.use(express.bodyParser());

app.post('/query', function(req, res){
	// keeps track of join tables found when parsing query
	// var joins = [];

	var client = getClient();
	// var sql = "select " + cslist( getfields( req.body[0], req.body[1], joins ) ) + " from " + req.body[0] + joinClause( joins ); 
	var sql = norm.genSql( req.body[0], req.body[1] ); 
	console.log( sql );
	client.query(
		sql, [], 
		function( err, results ) { 
			res.send( disjoin( req.body, results ) );
			client.end();
	});
});


app.listen(3000);
