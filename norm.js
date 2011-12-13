typeOf = require('./util').typeOf;
cslist = require('./util').cslist;

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



