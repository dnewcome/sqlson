var express = require('express');
var query = require('./query');
var disjoin = require('./disjoin').disjoin_set;
var getClient = require('./getclient.js').getClient;
var bodyParser = require('body-parser');

var app = express();
app.use(express.json());

app.post('/query', function(req, res){
	// keeps track of join tables found when parsing query
	// var joins = [];

	var client = getClient();
	// var sql = "select " + cslist( getfields( req.body[0], req.body[1], joins ) ) + " from " + req.body[0] + joinClause( joins ); 
	var sql = query.genSql( req.body ); 
	console.log( sql );
	client.query(
		sql, [], 
		function( err, results ) { 
			console.log(results);
			res.send( disjoin( req.body, results ) );
			client.end();
	});
});


app.listen(3000);
