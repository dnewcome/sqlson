var norm = require( '../norm' );
var assert = require( 'assert' );

function doTest( query, expected ) {
	var actual = norm.genSql( query );
	assert.equal(expected, norm.genSql( query ) );
}

/**
 * Test generation of sql for a simple query
 */
exports.testSqlGeneration = function() {
	var query = [ 
		"parent", null, { 
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

	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on child.fk_parentid = parent.id ";
	doTest( query, expected );
}

exports.testSqlGenerationWhere = function() {
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

	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on child.fk_parentid = parent.id where parent.id = 1";
	doTest( query, expected );
}

exports.testSqlGenerationMapping = function() {
	// change field names
	// shouldn't change generated sql, but affects how things are deserialized.
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

	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on child.fk_parentid = parent.id ";
	doTest( query, expected );
}

/**
 * Test a double join - parent/child/grandchild relationship
 */
exports.testJsonGen2 = function() {
	var query = [ 
		"parent", null, { 
			"idd":"id", 
			"textt":"text",
			"children": [ 
				"child", "child.fk_parentid = parent.id", { 
					"iddd":"id", 
					"texttt":"text",
					"children": [
						"grandchild", "grandchild.fk_childid = 1", {
							"id":"id",
							"text":"text"
						}
					]
				} 
			]
		} 
	];

	var expected = 
		"select parent.id as parent_id,parent.text as parent_text," + 
		"child.id as child_id,child.text as child_text," + 
		"grandchild.id as grandchild_id,grandchild.text as grandchild_text " + 
		"from parent " + 
		"join child on child.fk_parentid = parent.id " + 
		"join grandchild on grandchild.fk_childid = 1 "; 
	doTest( query, expected );
};
