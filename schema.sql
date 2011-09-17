-- drop database jsquery;
create database jsquery;
use jsquery;
create table parent (
	id integer not null auto_increment primary key,
	text varchar(100) not null
);
create table child (
	id integer not null auto_increment primary key,
	text varchar(100), 
	fk_parentid integer not null, 
	foreign key (fk_parentid) references parent(id)
);
