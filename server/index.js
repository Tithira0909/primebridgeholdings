const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── AUTH ─────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  db.get('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ success: true, username: row.username });
  });
});

// ─── BLOGS ────────────────────────────────────────────────────────────────────
app.get('/api/blogs', (req, res) => {
  db.all('SELECT * FROM blogs ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(b => ({ ...b, content: b.content ? JSON.parse(b.content) : null }));
    res.json(parsed);
  });
});

app.get('/api/blogs/:id', (req, res) => {
  db.get('SELECT * FROM blogs WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json({ ...row, content: row.content ? JSON.parse(row.content) : null });
  });
});

app.post('/api/blogs', (req, res) => {
  const { title, excerpt, content, author, category, image, date } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  const formattedDate = date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  db.run(
    `INSERT INTO blogs (title, excerpt, content, author, category, image, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, excerpt, contentStr, author || 'Admin', category || 'General', image || '', formattedDate],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Created' });
    }
  );
});

app.put('/api/blogs/:id', (req, res) => {
  const { title, excerpt, content, author, category, image } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  db.run(
    `UPDATE blogs SET title=?, excerpt=?, content=?, author=?, category=?, image=? WHERE id=?`,
    [title, excerpt, contentStr, author || 'Admin', category || 'General', image || '', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ success: true });
    }
  );
});

app.delete('/api/blogs/:id', (req, res) => {
  db.run('DELETE FROM blogs WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  });
});

// ─── SOCIALS ──────────────────────────────────────────────────────────────────
app.get('/api/socials', (req, res) => {
  db.all('SELECT * FROM socials', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const obj = {};
    rows.forEach(r => { obj[r.platform] = r.url; });
    res.json(obj);
  });
});

app.post('/api/socials', (req, res) => {
  const socials = req.body;
  if (!socials || typeof socials !== 'object') return res.status(400).json({ error: 'Invalid payload' });
  const stmt = db.prepare('INSERT OR REPLACE INTO socials (platform, url) VALUES (?, ?)');
  try {
    Object.entries(socials).forEach(([platform, url]) => stmt.run(platform, url || ''));
    stmt.finalize();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
const GENIE_APP_ID  = '36bafce7-a201-429b-a9e2-c5b78546677c';
const GENIE_APP_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjM2YmFmY2U3LWEyMDEtNDI5Yi1hOWUyLWM1Yjc4NTQ2Njc3YyIsImNvbXBhbnlJZCI6IjYzOTdmMzlkZjA3ZmJhMDAwODQyYTkwYiIsImlhdCI6MTY3MDkwMjY4NSwiZXhwIjo0ODI2NTc2Mjg1fQ.fy12dgFhA3iB_RCjD7y8j5HClNRZUiBZgAg-QzFpxaE';
const GENIE_API_BASE = 'https://api.geniebiz.lk';

// Create payment session → returns Genie checkout URL
app.post('/api/payment/create', async (req, res) => {
  const { name, email, phone, amount, reference } = req.body;

  if (!name || !email || !phone || !amount) {
    return res.status(400).json({ error: 'Name, email, phone and amount are required' });
  }

  const orderId = `PB-${Date.now()}`;
  const amountInCents = Math.round(parseFloat(amount) * 100);

  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(`${GENIE_API_BASE}/v1/ipg/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GENIE_APP_KEY}`,
        'X-APP-ID': GENIE_APP_ID,
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: 'LKR',
        orderId: orderId,
        customerInfo: {
          name: name,
          email: email,
          phone: phone,
        },
        description: reference || 'PrimeBridge Payment',
        successUrl: 'http://localhost:5173/payment/success',
        failUrl: 'http://localhost:5173/payment/failed',
        cancelUrl: 'http://localhost:5173/payment/failed',
      }),
    });

    const data = await response.json();
    console.log('Genie create payment response:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Genie API error', details: data });
    }

    // Save pending payment to DB
    db.run(
      `INSERT INTO payments (order_id, customer_name, customer_email, customer_phone, amount, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [orderId, name, email, phone, parseFloat(amount)],
      function(err) {
        if (err) console.error('Failed to save pending payment:', err.message);
      }
    );

    res.json({ checkoutUrl: data.data?.webUrl || data.webUrl || data.url, orderId });

  } catch (err) {
    console.error('Payment create error:', err);
    res.status(500).json({ error: 'Failed to initiate payment', details: err.message });
  }
});

// Webhook — Genie calls this after payment
app.post('/api/payment/webhook', (req, res) => {
  const payload = req.body;
  console.log('Genie webhook received:', JSON.stringify(payload, null, 2));

  const orderId = payload.orderId || payload.order_id;
  const transactionId = payload.transactionId || payload.transaction_id || payload.id;
  const status = payload.status === 'SUCCESS' ? 'success' : 'failed';

  if (orderId) {
    db.run(
      `UPDATE payments SET status=?, genie_transaction_id=?, raw_webhook=?, updated_at=datetime('now')
       WHERE order_id=?`,
      [status, transactionId || '', JSON.stringify(payload), orderId],
      function(err) {
        if (err) console.error('Webhook DB update error:', err.message);
        else console.log(`Payment ${orderId} updated to ${status}`);
      }
    );
  }

  res.status(200).json({ received: true });
});

// Get all transactions for Admin panel
app.get('/api/payment/transactions', (req, res) => {
  db.all('SELECT * FROM payments ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});