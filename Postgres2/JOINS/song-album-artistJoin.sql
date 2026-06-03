SELECT songs.name as song_title, albums.name AS album_title, artists.name as artist_name 
FROM songs INNER JOIN albums ON songs.albums_id = albums.id 
JOIN artists ON albums.artists_id = artists.id;


SELECT artists.name as artists_name, COUNT(songs.id) as song_count FROM artists 
LEFT JOIN albums ON artists.id = albums.artists_id 
LEFT JOIN songs ON albums.id = songs.albums_id 
GROUP BY artists.id, artists.name;



SELECT artists.name AS artists_name, SUM(songs.length_seconds)/60 as total_songs_length FROM artists 
LEFT JOIN albums ON artists.id = albums.artists_id LEFT JOIN songs ON albums.id = songs.albums_id 
GROUP BY artists.id, artists.name;


