const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS admins (
      username TEXT PRIMARY KEY,
      password TEXT NOT NULL
    )`);

    db.get("SELECT * FROM admins WHERE username = 'admin'", (err, row) => {
      if (!row) {
        db.run("INSERT INTO admins (username, password) VALUES ('admin', 'admin123')");
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS socials (
      platform TEXT PRIMARY KEY,
      url TEXT NOT NULL
    )`);

    const defaultSocials = [
      { platform: 'facebook',  url: 'https://facebook.com/primebridge' },
      { platform: 'instagram', url: 'https://instagram.com/primebridge' },
      { platform: 'linkedin',  url: 'https://linkedin.com/company/primebridge' },
      { platform: 'address',   url: '123 Business Avenue, Colombo 03, Sri Lanka' },
      { platform: 'phone',     url: '+94 11 234 5678' },
      { platform: 'email',     url: 'info@primebridgegroup.com' },
    ];

    defaultSocials.forEach(s => {
      db.get("SELECT * FROM socials WHERE platform = ?", [s.platform], (err, row) => {
        if (!row) {
          db.run("INSERT INTO socials (platform, url) VALUES (?, ?)", [s.platform, s.url]);
        }
      });
    });

    db.run(`CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      author TEXT,
      category TEXT,
      image TEXT,
      date TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      genie_transaction_id TEXT,
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'LKR',
      status TEXT DEFAULT 'pending',
      raw_webhook TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )`, (err) => {
      if (err) console.error('Error creating payments table:', err.message);
      else console.log('All database tables ready.');
    });

  });
}

module.exports = db;