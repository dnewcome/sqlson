/**
 * MySQL client connection for web server and
 * integration tests that touch the database.
 */
function getClient() {
	var mysql = require('mysql');
	var connection = new mysql.createConnection({
		host: 'localhost',
		user: 'jsquery',
		password: 'jsquery',
		database: 'jsquery'
	});

	return connection;
}

exports.getClient = getClient;
