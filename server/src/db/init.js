export const initDB = (database) => {
	const query = `
  PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO user(username) VALUES('deadpool');
    INSERT INTO user(username) VALUES('peter parker');
    INSERT INTO user(username) VALUES('bruce wayne');

    CREATE TABLE IF NOT EXISTS stories (
      story_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER NOT NULL,
      is_published INTEGER DEFAULT 0,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES user(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS published_stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (story_id) REFERENCES stories(story_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS followers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      follower_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
      FOREIGN KEY (follower_id) REFERENCES user(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS claps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      clapped_by INTEGER NOT NULL,
      FOREIGN KEY (story_id) REFERENCES published_stories(id) ON DELETE CASCADE,
      FOREIGN KEY (clapped_by) REFERENCES user(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      commented_by INTEGER NOT NULL,
      commented_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (story_id) REFERENCES published_stories(id) ON DELETE CASCADE,
      FOREIGN KEY (commented_by) REFERENCES user(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS session (
      session_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      logged_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    );
    `;

	database.exec(query);
};
