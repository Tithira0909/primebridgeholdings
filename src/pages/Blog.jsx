import React from 'react';
import { ArrowRight, User, Calendar } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const Blog = () => {
  const { blogPosts } = useBlog();

  return (
    <div className="blog-page animate-fade-in">
      <header className="page-header text-center" style={{ background: "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/blog-bg.jpg') center/cover no-repeat" }}>
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
