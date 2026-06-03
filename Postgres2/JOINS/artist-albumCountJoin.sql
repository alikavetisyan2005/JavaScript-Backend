SELECT artists.name as artist_name, COUNT(albums.id) as album_count
from artists LEFT JOIN albums ON artists.id = albums.artists_id GROUP BY artists.name;


SELECT artists.name as artists_name 
FROM artists LEFT JOIN albums ON artists.id = albums.artists_id WHERE albums.id IS NULL;