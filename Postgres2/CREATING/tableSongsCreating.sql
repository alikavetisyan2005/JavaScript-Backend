CREATE TABLE songs (id SERIAL PRIMARY KEY,
name varchar(30),
artists_id INT REFERENCES artists(id),
albums_id INT REFERENCES albums(id)); 
