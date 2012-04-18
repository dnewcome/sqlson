var assert = require('assert');
var deepmerge = require('../deepmerge').deepmerge;
var mergeArray = require('../deepmerge').mergeArray;

exports.deepmerge = function() {
	var input1 = {
		"id":1,"textt":"first parent","children": [	
			{"id":1,"texttt":"child 1 of first parent", "children":[]}
	] };

	var input2 = {
		"id":1,"textt":"first parent","children": [	
			{"id":3,"texttt":"child 2 of first parent", "children":[]}
	] };

	var expected = {
		"id":1,"textt":"first parent","children": [	
			{"id":1,"texttt":"child 1 of first parent", "children":[]},
			{"id":3,"texttt":"child 2 of first parent", "children":[]}
		]
	};
	
	var actual = deepmerge( input1, input2 );
	assert.deepEqual( actual, expected );
}

exports.deepmerge2 = function() {
	var input1 = {
		"id":1,"textt":"first parent","children": [	
			{"id":1,"texttt":"child 1 of first parent", "children":[]}
	] };

	var input2 = {
		"id":1,"textt":"first parent","children": [	
			{"id":3,"texttt":"child 2 of first parent", "children":[
				{"id":4,"texttt":"child 1 of second child", "children":[]}
			] }
	] };

	var expected = {
		"id":1,"textt":"first parent","children": [	
			{"id":1,"texttt":"child 1 of first parent", "children":[]},
			{"id":3,"texttt":"child 2 of first parent", "children":[
				{"id":4,"texttt":"child 1 of second child", "children":[]}
			] }
	] };
	
	var actual = deepmerge( input1, input2 );
	console.log( 'actual' );
	console.log( JSON.stringify( actual, null, 4 ) );
	console.log( 'expected' );
	console.log( JSON.stringify( expected, null, 4 ) );
	assert.deepEqual( actual, expected );
}

exports.deepmerge3 = function() {
	var input1 = {
		"id":1,"textt":"first parent","children": [	
			{"id":1,"texttt":"child 1 of first parent", "children":[]},
			{"id":3,"texttt":"child 2 of first parent", "children":[
				{"id":5,"texttt":"child 1 of second child", "children":[]}
			] }
	] };

	var input2 = {
		"id":1,"textt":"first parent","children": [	
			{"id":3,"texttt":"child 2 of first parent", "children":[
				{"id":4,"texttt":"child 1 of second child", "children":[]}
			] }
	] };

	var expected = {
		"id":1,"textt":"first parent","children": [	
			{"id":1,"texttt":"child 1 of first parent", "children":[]},
			{"id":3,"texttt":"child 2 of first parent", "children":[
				{"id":5,"texttt":"child 1 of second child", "children":[]},
				{"id":4,"texttt":"child 1 of second child", "children":[]}
			] }
	] };
	
	var actual = deepmerge( input1, input2 );
	console.log( 'actual' );
	console.log( JSON.stringify( actual, null, 4 ) );
	console.log( 'expected' );
	console.log( JSON.stringify( expected, null, 4 ) );
	assert.deepEqual( actual, expected );
}

exports.mergeArrayEmpty = function() {
	console.log( 'running mergeArrayEmpty' );
	var input1 = [
		{"id":1,"texttt":"child 1 of first parent"},
		{"id":3,"texttt":"child 2 of first parent"}
	];
	var input2 = [];
	var expected = [
		{"id":1,"texttt":"child 1 of first parent"},
		{"id":3,"texttt":"child 2 of first parent"}
	];
	var actual = mergeArray( input1, input2 );
	assert.deepEqual( actual, expected );
}
exports.mergeArrayConflict = function() {
	console.log( 'running mergeArrayConflict' );
	var input1 = [
		{"id":1,"texttt":"child 1 of first parent"},
		{"id":3,"texttt":"child 2 of first parent"}
	];
	var input2 = [
		{"id":1,"texttt":"should not overwrite"},
	];
	var expected = [
		{"id":1,"texttt":"child 1 of first parent"},
		{"id":3,"texttt":"child 2 of first parent"}
	];
	var actual = mergeArray( input1, input2 );
	assert.deepEqual( actual, expected );
}
exports.mergeArrayNonEmpty = function() {
	console.log( 'running mergeArrayNonEmpty' );
	var input1 = [
		{"id":1,"texttt":"child 1 of first parent"},
		{"id":3,"texttt":"child 2 of first parent"}
	];
	var input2 = [
		{"id":2,"texttt":"should be added"}
	];
	var expected = [
		{"id":1,"texttt":"child 1 of first parent"},
		{"id":3,"texttt":"child 2 of first parent"},
		{"id":2,"texttt":"should be added"},
	];
	var actual = mergeArray( input1, input2 );
	assert.deepEqual( actual, expected );
}
