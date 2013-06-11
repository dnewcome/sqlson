/* 
* merge t2 into t1
* TODO: could make this faster by creating hash first
* as in previous implementation
*/
exports.treeMerge = function treeMerge( t1, t2) {
	for( var i=0; i < t2.length; i++ ) {
		var item = t2[i];
		var idx = indexOf( item.id, t1 );	
		if( idx != null ) {
			treeMerge( t1[idx].children, item.children );
		}
		else {
			t1.push( item );
		}
	}
	return t1;
}

/**
 * find out if id exists in array
 * and return its array index
 */
function indexOf( id, arr ) {
	for( var i=0; i<arr.length; i++ ) {
		if( arr[i].id == id ) {
			return i;
		}
	}
	return null;
}

