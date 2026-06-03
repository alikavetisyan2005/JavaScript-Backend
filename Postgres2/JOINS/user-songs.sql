SELECT users.username AS username, COUNT(DISTINCT user_songs.song_id)  
FROM users 
LEFT JOIN user_songs ON users.id = user_songs.user_id  
GROUP BY users.id, users.username;

SELECT songs.name as songs_title, 
COUNT(user_songs.song_id) as play_count 
from user_songs 
INNER JOIN songs 
ON user_songs.song_id = songs.id 
GROUP BY songs.id, songs.name 
ORDER BY play_count DESC 
LIMIT 5;



 DELETE FROM artists WHERE artists.name = 'Shakira';
-- ERROR:  update or delete on table "artists" violates foreign key constraint "albums_artists_id_fkey" on table "albums"
-- DETAIL:  Key (id)=(3) is still referenced from table "albums".

