/**
 * Test json recovery of object graph from record set
 */

var typeOf = require( '../util' ).typeOf;
var disjoin = require('../to_json-join').disjoin_set;

exports.toJson = function() {

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

	var recordset = [ 
		{ 
			parent_id: 1,
			parent_text: 'first parent',
			child_id: 1,
			child_text: 'child 1 of first parent' 
		}, { 
			parent_id: 1,
			parent_text: 'first parent',
			child_id: 2,
			child_text: 'child 2 of first parent' 
		} 
	];
	// console.log( disjoin( query, results ) );
	console.log( JSON.stringify( disjoin( query, recordset ), null, 4 ) );
};
