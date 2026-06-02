const express = require('express');
const cors = require('cors');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const db = require('./db.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── AUTHENTICATION ENDPOINTS ────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { username, password, totpToken } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred: ' + err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
    
    // Check if 2FA is enabled
    if (row.totp_enabled) {
      if (!totpToken) {
        // Return require2FA flag so frontend can prompt for token
        return res.json({ require2FA: true, username: row.username });
      } else {
        // Verify token
        const verified = speakeasy.totp.verify({
          secret: row.totp_secret,
          encoding: 'base32',
          token: totpToken,
          window: 1 // allows 30 seconds drift before/after
        });
        
        if (!verified) {
          return res.status(401).json({ error: 'Invalid 2FA code' });
        }
      }
    } else {
      // 2FA not enabled, inform frontend it needs to be set up
      if (!totpToken) {
        return res.json({ requireSetup2FA: true, username: row.username });
      }
    }

    res.json({ success: true, username: row.username, token: 'fake-jwt-token' });
  });
});

app.post('/api/auth/setup-2fa', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });
  
  const secret = speakeasy.generateSecret({
    name: `PrimeBridgeHoldings (${username})`
  });
  
  // Save temporary secret to DB (not enabled yet)
  db.run('UPDATE admins SET totp_secret = ? WHERE username = ?', [secret.base32, username], (err) => {
    if (err) return res.status(500).json({ error: 'Database error: ' + err.message });
    
    QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) return res.status(500).json({ error: 'Error generating QR code' });
      res.json({ qrCodeUrl: data_url, secret: secret.base32 });
    });
  });
});

app.post('/api/auth/verify-2fa', (req, res) => {
  const { username, totpToken } = req.body;
  if (!username || !totpToken) return res.status(400).json({ error: 'Username and token required' });
  
  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error: ' + err.message });
    if (!row || !row.totp_secret) return res.status(400).json({ error: '2FA setup not initiated' });
    
    const verified = speakeasy.totp.verify({
      secret: row.totp_secret,
      encoding: 'base32',
      token: totpToken,
      window: 1
    });
    
    if (verified) {
      db.run('UPDATE admins SET totp_enabled = 1 WHERE username = ?', [username], (err) => {
        if (err) return res.status(500).json({ error: 'Database error: ' + err.message });
        res.json({ success: true, token: 'fake-jwt-token' });
      });
    } else {
      res.status(401).json({ error: 'Invalid verification code' });
    }
  });
});

// ─── BLOG ENDPOINTS ──────────────────────────────────────────────────────────
// Get all blogs
app.get('/api/blogs', (req, res) => {
  db.all('SELECT * FROM blogs ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Parse content JSON strings back to arrays/objects before sending to client
    const parsedBlogs = rows.map(blog => ({
      ...blog,
      content: blog.content ? JSON.parse(blog.content) : null
    }));
    res.json(parsedBlogs);
  });
});

// Get a single blog
app.get('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM blogs WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const blog = {
      ...row,
      content: row.content ? JSON.parse(row.content) : null
    };
    res.json(blog);
  });
});

// Add a new blog
app.post('/api/blogs', (req, res) => {
  const { title, excerpt, content, author, category, image, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  const formattedDate = date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const query = `
    INSERT INTO blogs (title, excerpt, content, author, category, image, date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [title, excerpt, contentStr, author || 'Admin', category || 'General', image || '', formattedDate], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Blog post created successfully' });
  });
});

// Delete a blog
app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM blogs WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  });
});

// Update a blog
app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, author, category, image } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);

  const query = `
    UPDATE blogs 
    SET title = ?, excerpt = ?, content = ?, author = ?, category = ?, image = ?
    WHERE id = ?
  `;

  db.run(query, [title, excerpt, contentStr, author || 'Admin', category || 'General', image || '', id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ success: true, message: 'Blog post updated successfully' });
  });
});

// ─── SOCIALS ENDPOINTS ───────────────────────────────────────────────────────
// Get all socials
app.get('/api/socials', (req, res) => {
  db.all('SELECT * FROM socials', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Format as a simple key-value object { facebook: '...', instagram: '...', linkedin: '...' }
    const socialsObj = {};
    rows.forEach(row => {
      socialsObj[row.platform] = row.url;
    });
    res.json(socialsObj);
  });
});

// Save/Update socials bulk
app.post('/api/socials', (req, res) => {
  const socials = req.body; // Expects format: { facebook: '...', instagram: '...', linkedin: '...' }
  
  if (!socials || typeof socials !== 'object') {
    return res.status(400).json({ error: 'Social links payload is required' });
  }

  const stmt = db.prepare('INSERT OR REPLACE INTO socials (platform, url) VALUES (?, ?)');
  
  try {
    Object.entries(socials).forEach(([platform, url]) => {
      stmt.run(platform, url || '');
    });
    stmt.finalize();
    res.json({ success: true, message: 'Social links updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
