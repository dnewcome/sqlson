/**
 * Generate sql query 
 */
exports.genSql = function genSql( table, obj ) {
	var ret = "";
	var joins = [];
	return "select " + cslist( getfields( table, obj, joins ) ) + " from " + table + joinClause( joins ); 
};

/**
 * Convert array to comma separated list
 */
function cslist( arr ) {
	return arr.join(',');
}

/**
 * Convert array to comma separated list
 */
function joinClause( arr ) {
	var ret = " ";
	for( var i=0; i < arr.length; i++ ) {
		// TODO: join clause is hard coded
		ret += "join " + arr[i] + " on fk_parentid = parent.id "
	}
	return ret;
}

/**
 * Return comma separated list of fields
 * from object spec
 */
function getfields( table, obj, joins ) {
	var arr = [];
	for( item in obj ) {
		console.log( 'fields: ' + item + ' ' + obj[item] );
		if( typeOf( obj[item] ) == 'array' ) {
			joins.push( obj[item][0] );
			arr = arr.concat( getfields( obj[item][0], obj[item][1], joins ) );
		}
		else {
			arr.push( table + '.' + obj[item] + ' as ' + table + '_' + obj[item]  );	
		}
	}
	return arr;
}

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


// crockford's typeOf
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
} 