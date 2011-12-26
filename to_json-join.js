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
function disjoin_set( query, recordset, position, idkey, idval ) {
	console.log( "disjoining set" );
	var ret = [];
	position = position || { pos: 0 };
	console.log( "position: " + position.pos );
	for( ; position.pos < recordset.length;  ) {
		// nested objects, check for parent.
		if( typeof idkey != 'undefined' ) {
			if( recordset[position.pos][idkey] == idval ) {
				ret.push( disjoin( query, recordset[position.pos], recordset, position ) );
			}
			else {
			}
		}
		// toplevel objects - no parent
		else {
			ret.push( disjoin( query, recordset[position.pos], recordset, position ) );
		}
	console.log( 'increment position' );
	position.pos++; // increment position when we don't recurse
	}
	return ret;
}

/**
 * Reconstruct single json object from record 
 */
function disjoin( query, record, recordset, position ) {
	var ret = {};
	var table = query[0];
	var subquery = query[2];
	for( item in subquery ) {
		console.log( item );
		if( typeOf( subquery[item] ) == 'array' ) { 
			var val = subquery[item];
			ret[item] = disjoin_set( val, recordset, position, table+'_id', record[table+'_id'] );
		}
		else {
			var val = subquery[item]
			ret[item] = record[table+'_'+val];
		}
	}
	return ret;
}

exports.disjoin_set = disjoin_set;
