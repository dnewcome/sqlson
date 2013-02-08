/**
 * Operation specific to recursively merging two
 * objects generated by disjoin. The 'children' property
 * is used specifically to look for child object arrays to 
 * merge together. Other fields are not merged, only children.
 * TODO: rename this to mergeChildren?
 * TODO: objects are merged in-place, might want to create
 * a new return value instead.
 */
exports.deepmerge = deepmerge = function( o1, o2 ) {
	console.log( o1.id, o2.id );
	mergeArray( o1.children, o2.children );
	
	for( var i=0; i<o2.children.length; i++ ) {
		for( var j=0; j<o1.children.length; j++ ) {
			if( o1.children[j].id == o2.children[i].id ) {
				deepmerge( o1.children[j], o2.children[i] );
			}
		}
	}
	return o1;
}

/*
 * Operates on an array of results from disjoin.
 * Merges together duplicate results by id
 * TODO: this possibly belongs in disjoin
 */
exports.mergeLikeIds = mergeLikeIds = function( arr ) {
	ret = [];
	for( var i=0; i<arr.length; i++ ) {
		for( var j=0; j<arr.length; j++ ) {
			if( i != j && arr[i].id == arr[j].id ) {
				ret.push( deepmerge( arr[i], arr[j] ) );
				// arr.splice( j, 1 );
			}
		}
	}
	return ret;
}

/* 
 * merge array a2 into a1
 * Think of this as a set operation on 2 arrays of objects
 * using object.id as the element uniqueness constraint
 * Elements of duplicated objects aren't merged, the source
 * clobbers the destination.
 *
 * TODO: cook up some more general set operations
 * a1 is changed in place and also returned.
 * TODO: may want to re-think the in-place changing of 
 * a1. Could lead to confusing behavior down the road
 */
exports.mergeArray = mergeArray = function ( a1, a2 ) {
	var idFieldName = 'id';
	// collect a hash of ids in dest
	var ids = {};
	for( var i=0; i<a1.length; i++ ) {
		// store array position for lookup
		ids[a1[i][idFieldName]] = i;
	}
	console.log( ids );

	// perform merge
	for( var j=0; j<a2.length; j++ ) {
		console.log( ! ids[a2[j][idFieldName]] );
		if( ids[a2[j][idFieldName]] == undefined ) {
			a1.push( a2[j] );
		}	
	}
	return a1;
};
