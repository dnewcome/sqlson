
function getClient() {
	var Client = require('mysql').Client,
	client = new Client()

	client.user = 'root';
	client.password = 'root';

	client.useDatabase( 'jsquery', function(){} );
	return client;
}

exports.getClient = getClient;
