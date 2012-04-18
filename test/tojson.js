/**
 * Test json recovery of object graph from record set
 */

var assert = require( 'assert' );
var disjoin = require('../disjoin').disjoin_set;
var deepmerge = require( '../deepmerge' ).deepmerge;
var mergeLikeIds = require( '../deepmerge' ).mergeLikeIds;

exports.toJson = function() {
	var query = [ 
		"parent", null, { 
			"id":"id", 
			"textt":"text",
			"children": [ 
				"child", "child.fk_parentid = parent.id", { 
					"id":"id", 
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
	var expected = [
		{
			"children": [
				{
					"children": [],
					"id": 1,
					"texttt": "child 1 of first parent"
				},
				{
					"children": [],
					"id": 2,
					"texttt": "child 2 of first parent"
				}
			],
			"id": 1,
			"textt": "first parent"
		}
	];

	var actual = disjoin( query, recordset );

	console.log( 'actual' );
	console.log( JSON.stringify( actual, null, 4 ));
	console.log( 'expected' );
	console.log( JSON.stringify( expected, null, 4 ));
	assert.deepEqual( expected, actual );
	
};

exports.toJson2 = function() {
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

	var recordset = [ 
		{ 
			parent_id: 1,
			parent_text: 'first parent',
			child_id: 1,
			child_text: 'child 1 of first parent' 
		}, { 
			parent_id: 2,
			parent_text: 'second parent',
			child_id: 3,
			child_text: 'child 1 of second parent' 
		} 
	];

	var expected = [
		{
			"children": [
				{
					"children": [],
					"id": 1,
					"text": "child 1 of first parent"
				}
			],
			"id": 1,
			"text": "first parent"
		},
		{
			"children": [
				{
					"children": [],
					"id": 3,
					"text": "child 1 of second parent"
				}
			],
			"id": 2,
			"text": "second parent"
		}
	];

	var actual = disjoin( query, recordset );

	console.log( 'expected' );
	console.log( JSON.stringify( expected, null, 4 ));
	console.log( 'actual' );
	console.log( JSON.stringify( actual, null, 4 ));

	assert.deepEqual( expected, actual );
	
};
