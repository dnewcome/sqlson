drop database jsquery;
create database jsquery;
use jsquery;
create user 'jsquery' identified by 'jsquery';
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
create table grandchild (
	id integer not null auto_increment primary key,
	text varchar(100), 
	fk_childid integer not null, 
	foreign key (fk_childid) references child(id)
);
