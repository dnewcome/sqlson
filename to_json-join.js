/**
 * Reconstruct json object array from record set
 */
function disjoin_set( query, recordset, idkey, idval ) {
	console.log( idkey + ' ' + idval )
	var ret = [];
	for( var i=0; i < recordset.length; i++ ) {
		if( typeof idkey != 'undefined' ) {
			if( recordset[i][idkey] == idval ) {
				ret.push( disjoin( query, recordset[i], recordset ) );
			}
		}
		else {
			ret.push( disjoin( query, recordset[i], recordset ) );
		}
	}
	return ret;
}
exports.disjoin_set = disjoin_set;

/**
 * Reconstruct single json object from record 
 */
function disjoin( query, record, recordset ) {
	var ret = {};
	var table = query[0];
	for( item in query[1] ) {
		if( typeOf( query[1][item] ) == 'array' ) { 
			ret[item] = disjoin_set( query[1][item], recordset, table+'_id', record[table+'_id'] );
		}
		else {
			ret[item] = record[table+'_'+item];
		}
	}
	return ret;
}

exports.disjoin_set = disjoin_set;
