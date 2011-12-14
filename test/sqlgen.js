var norm = require( '../norm' );
var assert = require( 'assert' );

exports.testSqlGeneration = function() {
	// in this example, join criteria are hard coded in the system.
	// also there are no filters.
	var query = [ 
		// note that 'where' relation is optional, but join relation is not
		"parent", { 
			"id":"id", 
			"text":"text",
			"children": [ 
				"child", "child.fk_parentid = parent.id", { 
					"id":"id", 
					"text":"text"
				} 
			]
		} 
	];

	var actual = norm.genSql( query[0], query[1] );
	// note the trailing space
	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on child.fk_parentid = parent.id ";

	assert.equal(expected, actual);
}

exports.testSqlGenerationWhere = function() {
	// in this example, join criteria are hard coded in the system.
	// Filter is on id.
	var query = [ 
		"parent", "parent.id = 1", { 
			"id":"id", 
			"text":"text",
			"children": [ 
				"child", "child.fk_parentid = parent.id", { 
					"id":"id", 
					"text":"text"
				} 
			]
		} 
	];

	var actual = norm.genSql( query[0], query[2], query[1] );
	// note the trailing space
	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on child.fk_parentid = parent.id where parent.id = 1";

	assert.equal(expected, actual);
}

exports.testSqlGenerationMapping = function() {
	// change field names
	// shouldn't change generated sql, but affects how things are deserialized.
	var query = [ 
		"parent", { 
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

	var actual = norm.genSql( query[0], query[1] );
	// note the trailing space
	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on child.fk_parentid = parent.id ";

	assert.equal(expected, actual);
}

exports.testJsonGen = function() {
	var getClient = require('../getclient.js').getClient;
	var disjoin = require('../to_json-join').disjoin_set;

	var query = [ 
		"parent", { 
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
	var sql = norm.genSql( query[0], query[1] ); 
	console.log( "testJsonGen: "  + sql );
	console.log( sql );
	client.query(
		sql, [], 
		function( err, results ) { 
			console.log( results );
			// console.log( disjoin( query, results ) );
			// console.log( JSON.stringify( disjoin( query, results ), null, 4 ) );
			client.end();
		}
	);
};

exports.testJsonGen2 = function() {

	var query = [ 
		"parent", { 
			"idd":"id", 
			"textt":"text",
			"children": [ 
				"child", "child.fk_parentid = parent.id", { 
					"iddd":"id", 
					"texttt":"text",
					"children": [
						"child", "child.fk_parentid = 1", {
							"id":"id",
							"text":"text"
						}
					]
				} 
			]
		} 
	];
	var actual = norm.genSql( query[0], query[1] );
	console.log( actual );

	// assert.equal(expected, actual);
};
