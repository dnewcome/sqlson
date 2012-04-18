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

// merge a2 into a1
// a1 is changed in place and also returned.
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
