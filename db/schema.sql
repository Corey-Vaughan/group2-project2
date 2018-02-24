CREATE DATABASE condo_db;
USE condo_db;

CREATE TABLE condos
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	location varchar(255) NOT NULL,
	owner_id int,
	price int,
	pets boolean DEFAULT 0,
	guests int NOT NULL DEFAULT 1,
	description varchar(1000) NOT NULL,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (owner_id) REFERENCES users(id),
	PRIMARY KEY (id)
);

CREATE TABLE pictures
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	property_id int,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (property_id) REFERENCES condos(id),
	PRIMARY KEY (id)
);

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);