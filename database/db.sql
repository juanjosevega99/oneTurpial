CREATE DATABASE database_oneturpial;

USE database_oneturpial;

-- USERS TABLE
CREATE TABLE users (
  document_type VARCHAR(10) NOT NULL,
  id INT(11) NOT NULL,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  birth_date DATE NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

DESCRIBE users;


-- CARS TABLE
CREATE TABLE cars (
  user_id INT(11),
  placa VARCHAR(10) NOT NULL,
  marca VARCHAR(15) NOT NULL,
  modelo VARCHAR(15) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE cars
  ADD PRIMARY KEY (placa);

DESCRIBE cars;