typeOf = require('./util').typeOf;
cslist = require('./util').cslist;

/**
 * Generate sql query 
 */
exports.genSql = function genSql( query ) {
	var table = query[0];
	var obj = query[2];
	var where = query[1];
	console.log(where);

	var ret = "";
	var joins = [];

	if( where ) {
		return "select " + cslist( getfields( table, obj, joins ) ) + " from " + table + joinClause( joins ) + "where " + where; 
	}
	else {
		return "select " + cslist( getfields( table, obj, joins ) ) + " from " + table + joinClause( joins ); 
	}

};

/**
 * Convert array to comma separated list
 */
function joinClause( arr ) {
	var ret = " ";
	for( var i=0; i < arr.length; i++ ) {
		// TODO: join clause is hard coded
		if( false /*arr[i].criteria*/ ) {
			// we always give table alias to support multiple joins of same table
			ret += "join " + arr[i].table + " on " + arr[i].criteria + " ";
		}
		else {
			ret += "join " + arr[i].table + " on fk_parentid = parent.id ";
		}
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
			joins.push( { table: obj[item][0], criteria: obj[item][1] } );
			arr = arr.concat( getfields( obj[item][0], obj[item][2], joins ) );
		}
		else {
			arr.push( table + '.' + obj[item] + ' as ' + table + '_' + obj[item]  );	
		}
	}
	return arr;
}



