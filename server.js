var express = require('express');
var getClient = require('./getclient.js').getClient;

var app = express.createServer();
app.use(express.bodyParser());

app.post('/query', function(req, res){
	// keeps track of join tables found when parsing query
	var joins = [];

	var client = getClient();
	var sql = "select " + cslist( getfields( req.body[0], req.body[1], joins ) ) + " from " + req.body[0] + joinClause( joins ); 
	console.log( sql );
	client.query(
		sql, [], 
		function( err, results ) { 
			res.send( disjoin_set( req.body, results ) );
			client.end();
	});
});

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
app.listen(3000);
