SELECT songs.name as song_title, albums.name AS album_title FROM songs INNER JOIN albums ON songs.albums_id = albums.id;

