var typeOf = require( './util' ).typeOf;
var mergeLikeIds = require( './merge' ).mergeLikeIds;

/**
 * Reconstruct json object array from record set
 * Iterate over composite recordset one row at a time
 *
 * query - json query spec
 * recorset - tabular db result
 * idkey - if this is a child, what is the join key
 * idval - if child, join value
 */
function disjoin_set( query, recordset ) {
	var ret = [];
	for( var i=0; i < recordset.length; i++ ) {
		ret.push( disjoin( query, recordset[i] ) );
	}
	var ret2 = mergeLikeIds( ret );
	console.log("records after disjoin: ", ret2.length);
	return ret2;
}

/**
 * Reconstruct single json object from record 
 */
function disjoin( query, record ) {
	// console.log('recursing ', query );
	var ret = {};
	ret.children = [];
	var table = query[0];
	var subquery = query[2];
	for( item in subquery ) {
		// console.log( item );
		if( typeOf( subquery[item] ) == 'array' ) { 
			var val = subquery[item];
			ret[item] = [disjoin( subquery[item], record )];
		}
		else {
			var val = subquery[item]
			ret[item] = record[table+'_'+val];
		}
	}
	return ret;
}

exports.disjoin_set = disjoin_set;
