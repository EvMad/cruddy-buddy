DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;
USE users_db;

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) DEFAULT NOT NULL,
    last_name VARCHAR(30) DEFAULT NOT NULL,
    email VARCHAR(100) DEFAULT NOT NULL,
    country VARCHAR(30),
    city VARCHAR(30),
    state_prov VARCHAR(30),
    PRIMARY KEY (id)
);

