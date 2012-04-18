# Introduction 

sqlson is a prototype template-based query language that simplifies writing database queries
in Javascript.

It leverages SQL and Javascript object notation to allow you to re-use what you already know
about SQL and Javascript, just together as a declarative template.

sqlson only supports simple queries against MySQL and does not provide any other DML methods like CREATE,
UPDATE or DELETE. I may support these in the future, but I'm focusing on just experimenting
with the template syntax and the inverse join algorithm for the time being.

# Usage

Assume we have the following parent/child MySQL tables defined:

    mysql> describe parent;
    +-------+--------------+------+-----+---------+----------------+
    | Field | Type         | Null | Key | Default | Extra          |
    +-------+--------------+------+-----+---------+----------------+
    | id    | int(11)      | NO   | PRI | NULL    | auto_increment |
    | text  | varchar(100) | NO   |     | NULL    |                |
    +-------+--------------+------+-----+---------+----------------+

    mysql> describe child;
    +-------------+--------------+------+-----+---------+----------------+
    | Field       | Type         | Null | Key | Default | Extra          |
    +-------------+--------------+------+-----+---------+----------------+
    | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
    | text        | varchar(100) | YES  |     | NULL    |                |
    | fk_parentid | int(11)      | NO   | MUL | NULL    |                |
    +-------------+--------------+------+-----+---------+----------------+

We'd like to query this data such that we end up with a tree of JS objects
containing the parent object along with its children, something like the following:

    {
        "id": 1, 
        "text":"this is the parent",
        "children": [ { 
            "id":1, 
            "text":"this is the first child"
        }, { 
            "id":2, 
            "text":"this is the second child"
        } ]
    }

We can write this as a query object by generalizing it and inserting some SQL
strings:

    var query = [ 
        "parent", "parent.id = 1", { 
            "id":"id", 
            "text":"text",
            "children": [ 
                "child", "child.fk_parentid = parent.id", { 
                    "id":"id", 
                    "text":"text"
                } 
            ]
        } 
    ];

A query specification is a JS array with the table name, the SQL WHERE clause and an
object template that maps the field names to JS object attributes.

We can use sqlson to generate the sql required to perform the query and disjoin the resulting
recordset. 

	var sql = genSql( query ); 
	client.query(
		sql, [], 
		function( err, results ) { 
			console.log( results );
			console.log( JSON.stringify( disjoin( query, results ), null, 4 ) );
			client.end();
		}
	);

# Status 

sqlson is a proof of concept currently. It isn't meant for production, and it isn't complete.
The basics have been implemented, but have not been optimized. The initial goal is to 
come up with a useful query format.

# Development

Create a test MySql database using createdb.sh.
Run the tests using expresso 
The server component uses Express.
Integration tests require MySQL and the node.js mysql library

# Limitations

Can't perform self-joins due to lack of aliases in the generated sql.

# License

MIT License, copyright 2012 Dan Newcome
