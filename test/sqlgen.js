var norm = require( '../norm' );
var assert = require( 'assert' );

exports.testSqlGeneration = function() {
	var query = [ "parent", { "id":"id", "text":"text", "children": [ "child", {"id":"id", "text":"text" } ] } ];

	var actual = norm.genSql( query[0], query[1] );
	// note the trailing space
	var expected = "select parent.id as parent_id,parent.text as parent_text,child.id as child_id,child.text as child_text from parent join child on fk_parentid = parent.id ";

	assert.equal(expected, actual);
}
