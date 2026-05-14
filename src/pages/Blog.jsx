import React from 'react';
import { ArrowRight, User, Calendar } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Navigating Corporate Tax Compliance in 2024',
      excerpt: 'Stay ahead of the curve with our comprehensive guide to understanding the latest corporate tax regulations in Sri Lanka and how they impact your business.',
      author: 'Finance Team',
      date: 'May 10, 2024',
      category: 'Finance'
    },
    {
      id: 2,
      title: 'The Importance of a Strong Digital Presence',
      excerpt: 'In today’s digital age, having a robust online presence is no longer optional. Learn how our digital solutions can help your brand stand out.',
      author: 'Digital Marketing Team',
      date: 'April 28, 2024',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Top Strategies for Retaining Top Talent',
      excerpt: 'Employee retention is crucial for long-term success. Discover effective HR strategies to keep your best employees engaged and motivated.',
      author: 'HR Experts',
      date: 'April 15, 2024',
      category: 'Human Resources'
    }
  ];

  return (
    <div className="blog-page animate-fade-in">
      <header className="page-header text-center">
        <div className="container">
          <h1>Our Blog</h1>
          <p>Insights, news, and expert advice from the PrimeBridge team.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {blogPosts.map(post => (
              <article key={post.id} className="card blog-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    backgroundColor: 'var(--color-bg-alt)', 
                    color: 'var(--color-primary)', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {post.category}
                  </span>
                </div>
                <h3>{post.title}</h3>
                <p style={{ flex: '1', color: 'var(--color-text-light)' }}>{post.excerpt}</p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--color-border)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-light)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <User size={14} /> {post.author}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} /> {post.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
