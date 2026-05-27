import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { MantineProvider } from "@mantine/core";
import { Calendar, User, ArrowLeft } from 'lucide-react';
import "@mantine/core/styles.css";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import './BlogDetail.css';

// Separate viewer component that receives BlockNote blocks
const BlockNoteViewer = ({ blocks }) => {
  // Creates a read-only editor instance initialized with saved content blocks
  const editor = useCreateBlockNote({
    initialContent: blocks
  });

  return (
    <div className="blocknote-viewer-wrapper">
      <MantineProvider>
        <BlockNoteView editor={editor} editable={false} theme="light" />
      </MantineProvider>
    </div>
  );
};

const BlogDetail = () => {
  const { id } = useParams();
  const { getPostById } = useBlog();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const data = await getPostById(id);
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id, getPostById]);

  const fallbackImage = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200';

  if (loading) {
    return (
      <div className="blog-detail-page animate-fade-in">
        <div className="container text-center" style={{ padding: '8rem 0' }}>
          <p className="loading-text" style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-page animate-fade-in">
        <div className="container text-center" style={{ padding: '8rem 0' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>Article Not Found</h2>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>The article you are looking for does not exist or has been removed.</p>
          <Link to="/blog" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page animate-fade-in">
      {/* Article Cover Header */}
      <div 
        className="detail-header" 
        style={{ 
          background: `linear-gradient(180deg, rgba(5, 15, 40, 0.65) 0%, rgba(5, 15, 40, 0.9) 100%), url(${post.image || fallbackImage}) center/cover no-repeat`
        }}
      >
        <div className="container header-container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={16} /> <span>Back to insights</span>
          </Link>
          
          <span className="detail-category">{post.category}</span>
          <h1 className="detail-title">{post.title}</h1>
          
          <div className="detail-meta">
            <div className="meta-item">
              <User size={16} className="meta-icon" />
              <span>{post.author}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} className="meta-icon" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="container content-container">
        <div className="article-wrapper">
          <p className="article-excerpt">{post.excerpt}</p>
          
          {post.content && post.content.length > 0 ? (
            <BlockNoteViewer blocks={post.content} />
          ) : (
            <p className="no-content">No detailed content available for this post.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
