import sqlite3 from "sqlite3" 

const db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      console.error("Error:", err.message);
    } else {
      console.log("Connected to SQLite database.");
    }
  });
  
  // Create a table in memory
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS queries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        sql_query TEXT
      )
    `, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table 'queries' created in memory.");
      }
    });
  });
 
export default db