var typeOf = require( './util' ).typeOf;

/**
 * Reconstruct json object array from record set
 * Iterate over composite recordset one row at a time
 *
 * query - json query spec
 * recorset - tabular db result
 * idkey - if this is a child, what is the join key
 * idval - if child, join value
 */
function disjoin_set( query, recordset, idkey, idval ) {
	var ret = [];
	for( var i=0; i < recordset.length; i++ ) {
		// nested objects, check for parent.
		if( typeof idkey != 'undefined' ) {
			if( recordset[i][idkey] == idval ) {
				ret.push( disjoin( query, recordset[i], recordset ) );
			}
		}
		// toplevel objects - no parent
		else {
			ret.push( disjoin( query, recordset[i], recordset ) );
		}
	}
	return ret;
}

/**
 * Reconstruct single json object from record 
 */
function disjoin( query, record, recordset ) {
	var ret = {};
	var table = query[0];
	var subquery = query[2];
	for( item in subquery ) {
		if( typeOf( subquery[item] ) == 'array' ) { 
			var val = subquery[item];
			ret[item] = disjoin_set( val, recordset, table+'_id', record[table+'_id'] );
		}
		else {
			var val = subquery[item]
			ret[item] = record[table+'_'+val];
		}
	}
	return ret;
}

exports.disjoin_set = disjoin_set;
