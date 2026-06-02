CREATE TABLE artists (id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
country TEXT DEFAULT 'UNKNOWN',
birth_year INT CHECK(birth_year > 1000));

