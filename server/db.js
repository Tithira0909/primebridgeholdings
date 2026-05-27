const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const defaultBlocks1 = [
  {
    id: "b1",
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level: 2 },
    content: [{ type: "text", text: "Understanding the 2026 Corporate Tax Landscape", styles: { bold: true } }]
  },
  {
    id: "b2",
    type: "paragraph",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "As Sri Lanka’s tax framework evolves in 2026, businesses must remain proactive in adapting to new corporate tax rates, documentation standards, and compliance deadlines. Keeping ahead of these regulations not only ensures legal compliance but also helps in strategic tax optimization." }]
  },
  {
    id: "b3",
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level: 3 },
    content: [{ type: "text", text: "Key Compliance Checklists for 2026" }]
  },
  {
    id: "b4",
    type: "bulletListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Review new corporate income tax thresholds and bracket schedules." }]
  },
  {
    id: "b5",
    type: "bulletListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Ensure full compliance with IRD digital filing mandates." }]
  },
  {
    id: "b6",
    type: "bulletListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Audit inter-company transactions for transfer pricing alignment." }]
  }
];

const defaultBlocks2 = [
  {
    id: "c1",
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level: 2 },
    content: [{ type: "text", text: "Elevate Your Business with a Modern Digital Identity", styles: { bold: true } }]
  },
  {
    id: "c2",
    type: "paragraph",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "A robust digital presence is no longer just a luxury—it is the primary gateway through which clients engage with your brand. From high-conversion websites to highly active social media platforms, a cohesive digital strategy drives lead generation, brand trust, and long-term customer loyalty." }]
  },
  {
    id: "c3",
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level: 3 },
    content: [{ type: "text", text: "Key Pillars of a Strong Digital Presence" }]
  },
  {
    id: "c4",
    type: "numberedListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "User-Centric Web Design: Responsive, fast, and secure web applications." }]
  },
  {
    id: "c5",
    type: "numberedListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Active Social Media Management: High-value content schedules across LinkedIn, Facebook, and Instagram." }]
  },
  {
    id: "c6",
    type: "numberedListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Consistent Branding: Visually unified design languages that convey excellence." }]
  }
];

const defaultBlocks3 = [
  {
    id: "d1",
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level: 2 },
    content: [{ type: "text", text: "Winning the Talent War in Modern Markets", styles: { bold: true } }]
  },
  {
    id: "d2",
    type: "paragraph",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Attracting premium talent is only half the battle. To drive sustainable success, businesses must build structured environments that keep high-performing teams motivated, aligned, and engaged. Implementing strategic talent retention plans helps mitigate high turnover costs and enhances institutional knowledge." }]
  },
  {
    id: "d3",
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level: 3 },
    content: [{ type: "text", text: "Top Strategies to Keeps Teams Motivated" }]
  },
  {
    id: "d4",
    type: "bulletListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Clear Growth Trajectories: Defined paths for internal growth and skill building." }]
  },
  {
    id: "d5",
    type: "bulletListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Healthy Workplace Culture: Empathetic leadership and open communication." }]
  },
  {
    id: "d6",
    type: "bulletListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: [{ type: "text", text: "Competitive & Fair Packages: Aligning financial and wellness remuneration with performance." }]
  }
];

const initialPosts = [
  {
    title: 'Navigating Corporate Tax Compliance in 2026',
    excerpt: 'Stay ahead of the curve with our comprehensive guide to understanding the latest corporate tax regulations in Sri Lanka and how they impact your business.',
    content: JSON.stringify(defaultBlocks1),
    author: 'Finance Team',
    date: 'May 10, 2026',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'The Importance of a Strong Digital Presence',
    excerpt: 'In today’s digital age, having a robust online presence is no longer optional. Learn how our digital solutions can help your brand stand out.',
    content: JSON.stringify(defaultBlocks2),
    author: 'Digital Marketing Team',
    date: 'April 28, 2026',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Top Strategies for Retaining Top Talent',
    excerpt: 'Employee retention is crucial for long-term success. Discover effective HR strategies to keep your best employees engaged and motivated.',
    content: JSON.stringify(defaultBlocks3),
    author: 'HR Experts',
    date: 'April 15, 2026',
    category: 'Human Resources',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'
  }
];

db.serialize(() => {
  // 1. Admins Table
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      username TEXT PRIMARY KEY,
      password TEXT NOT NULL
    )
  `);

  // Seed default admin if not exists
  db.get("SELECT * FROM admins WHERE username = 'admin'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO admins (username, password) VALUES ('admin', 'admin123')");
    }
  });

  // 2. Socials Table
  db.run(`
    CREATE TABLE IF NOT EXISTS socials (
      platform TEXT PRIMARY KEY,
      url TEXT NOT NULL
    )
  `);

  // Seed default socials and corporate settings
  const defaultSocials = [
    { platform: 'facebook', url: 'https://facebook.com/primebridge' },
    { platform: 'instagram', url: 'https://instagram.com/primebridge' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/primebridge' },
    { platform: 'address', url: '123 Business Avenue, Colombo 03, Sri Lanka' },
    { platform: 'phone', url: '+94 11 234 5678' },
    { platform: 'email', url: 'info@primebridgegroup.com' }
  ];

  defaultSocials.forEach(s => {
    db.get("SELECT * FROM socials WHERE platform = ?", [s.platform], (err, row) => {
      if (!row) {
        db.run("INSERT INTO socials (platform, url) VALUES (?, ?)", [s.platform, s.url]);
      }
    });
  });

  // 3. Blogs Table
  db.run(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      author TEXT,
      category TEXT,
      image TEXT,
      date TEXT
    )
  `);

  // Seed default blogs if table is empty
  db.get("SELECT count(*) as count FROM blogs", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO blogs (title, excerpt, content, author, category, image, date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      initialPosts.forEach(post => {
        stmt.run(post.title, post.excerpt, post.content, post.author, post.category, post.image, post.date);
      });
      stmt.finalize();
    }
  });
});

module.exports = db;
