SELECT * FROM songs WHERE length_seconds > 200 ORDER BY length_seconds;

SELECT * FROM songs WHERE name ILIKE '%me%';


SELECT * FROM user_songs ORDER BY created_at DESC LIMIT 5;

SELECT DISTINCT genre from songs;

-- AGGREGATIONS

SELECT count(*) as total_songs FROM songs;

SELECT AVG(length_seconds) from songs;

SELECT MIN(length_seconds) AS shortest,MAX(length_seconds) AS longest FROM songs;

SELECT albums_id, COUNT(*) AS song_count
FROM songs
GROUP BY albums_id
ORDER BY albums_id;

SELECT genre, COUNT(*) AS song_count
FROM songs
GROUP BY genre
ORDER BY song_count DESC;



SELECT genre, AVG(length_seconds) as average_length 
from songs
GROUP BY genre 
ORDER BY average_length;

SELECT genre, COUNT(*) AS song_count 
FROM songs
GROUP BY genre 
HAVING COUNT(*) > 3;

