var norm = require( '../norm' );
var assert = require( 'assert' );

exports.testSqlGeneration = function() {
	// in this example, join criteria are hard coded in the system.
	// also there are no filters.
	var query = [ 
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

/*
exports.testSqlGenerationWhereJoin = function() {
	// in this example, join criteria are explicitly specified.
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
	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on fk_parentid = parent.id where parent.id = 1";
}
*/
