/**
 * Roundtrip tests test sql gen and json recovery against
 * live sql database
 */
var sqlson = require( '../query' );
var assert = require( 'assert' );
var tds = require('tds');

var conn = new tds.Connection({
  host: '10.1.10.11',
  port: 62133,
  userName: 'vsalcp',
  password: 'vsalcp',
  database: 'vsalcp'
})

conn.on('error', function(error) {
  console.error('Received error', error);
});
conn.on('message', function(message) {
  console.info('Received info', message);
});

/**
 * Test round trip generating sql and parsing resultset
 */
exports.testJsonGen = function() {
	var disjoin = require('../disjoin').disjoin_set;

	var query = [ 
		"facilitatedcoursedates", "fcdID = 503 or fcdID = 525", { 
			"id":"fcdID", 
			"text":"fcdShortDesc",
			"children": [ 
				"contextitemregionmatch", "contextItemRegionMatch.cxirmRefID = facilitatedcoursedates.fcdID", { 
					"id":"cxirmId", 
					"region":"cxirm_FK_regID"
				} 
			]
		} 
	];



var rows = [];
conn.connect(function(error) {
  if (error != null) {
    console.error('Received error', error);
  } else {
    console.log('Now connected, can start using');

	var stmt = conn.createStatement(sqlson.genSql( query ) ); 
    // var stmt = conn.createStatement('SELECT top 10 fcdID, fcdShortDesc, cxirmRefId, cxirm_FK_regID from facilitatedcoursedates inner join contextitemregionmatch on fcdID = cxirmRefId');
    // var stmt = conn.createStatement('SELECT 1');
    stmt.on('row', function(row) {
        // console.log('Received row: ', row.getValue(0) );
        // console.log('Received row: ', JSON.stringify(row.metadata.columns) );
	convertedrow = {};
	for(var i=0; i < row.metadata.columns.length; i++ ) {
		convertedrow[row.metadata.columns[i].name] = row.getValue(row.metadata.columns[i].name)
	}
	rows.push(convertedrow);

    });

    stmt.on('error', function(error) {
      console.error('Received error', error);
    });
    stmt.on('done', function(isError, hasRowCount, rowCount) {
      console.log('Query completed, rowCount: ', rows.length);
      //console.log('Query completed, convertedrows: ', rows);

	console.log( JSON.stringify( disjoin( query, rows), null, 4 ) );
    });

    stmt.execute();
  }
});


};
exports.testJsonGen();
