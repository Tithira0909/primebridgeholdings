import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Calendar } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import './Blog.css';

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
            {blogPosts.map(post => {
              // Default background images matching their categories
              const defaultImages = {
                'Finance': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
                'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
                'Human Resources': 'https://images.unsplash.com/photo-1521737711867-e3b904737572?auto=format&fit=crop&q=80&w=600',
              };
              const cardImage = post.image || defaultImages[post.category] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600';

              return (
                <Link 
                  to={`/blog/${post.id}`} 
                  key={post.id} 
                  className="card blog-card animate-fade-in" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    textDecoration: 'none', 
                    color: 'inherit',
                    padding: '0',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src={cardImage} 
                      alt={post.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="blog-card-img-hover"
                    />
                  </div>
                  
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
                    
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', transition: 'color 0.2s ease' }} className="blog-title-hover">{post.title}</h3>
                    <p style={{ flex: '1', color: 'var(--color-text-light)', fontSize: '0.95rem', lineHeight: '1.6' }}>{post.excerpt}</p>
                    
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
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
