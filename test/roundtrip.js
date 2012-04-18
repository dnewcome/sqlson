/**
 * Roundtrip tests test sql gen and json recovery against
 * live mysql database
 */
var sqlson = require( '../query' );
var assert = require( 'assert' );

/**
 * Test round trip generating sql and parsing resultset
 */
exports.testJsonGen = function() {
	var getClient = require('../getclient.js').getClient;
	var disjoin = require('../disjoin').disjoin_set;

	var query = [ 
		"parent", null, { 
			"idd":"id", 
			"textt":"text",
			"children": [ 
				"child", "child.fk_parentid = parent.id", { 
					"iddd":"id", 
					"texttt":"text"
				} 
			]
		} 
	];
	var client = getClient();
	var sql = sqlson.genSql( query ); 
	console.log( "testJsonGen: "  + sql );
	console.log( sql );
	client.query(
		sql, [], 
		function( err, results ) { 
			console.log( results );
			// console.log( disjoin( query, results ) );
			console.log( JSON.stringify( disjoin( query, results ), null, 4 ) );
			client.end();
		}
	);
};

