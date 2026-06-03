CREATE TABLE user_songs (
song_id INT NOT NULL REFERENCES songs(id),
user_id INT NOT NULL REFERENCES users(id),
listened_at DATE DEFAULT NOW(),
PRIMARY KEY (user_id, song_id));


