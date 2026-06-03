CREATE TABLE albums (id SERIAL PRIMARY KEY,
artists_id INT REFERENCES artists(id),        
name TEXT NOT NULL,
release_date DATE);

