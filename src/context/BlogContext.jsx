import React, { createContext, useState, useContext, useEffect } from 'react';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

const initialPosts = [
  {
    id: 1,
    title: 'Navigating Corporate Tax Compliance in 2026',
    excerpt: 'Stay ahead of the curve with our comprehensive guide to understanding the latest corporate tax regulations in Sri Lanka and how they impact your business.',
    author: 'Finance Team',
    date: 'May 10, 2026',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    title: 'The Importance of a Strong Digital Presence',
    excerpt: 'In today’s digital age, having a robust online presence is no longer optional. Learn how our digital solutions can help your brand stand out.',
    author: 'Digital Marketing Team',
    date: 'April 28, 2026',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    title: 'Top Strategies for Retaining Top Talent',
    excerpt: 'Employee retention is crucial for long-term success. Discover effective HR strategies to keep your best employees engaged and motivated.',
    author: 'HR Experts',
    date: 'April 15, 2026',
    category: 'Human Resources',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'
  }
];

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogPosts(data);
      } else {
        console.warn("Server responded with error, falling back to localStorage/initial");
        loadFallback();
      }
    } catch (err) {
      console.error("Failed to fetch blogs from API, using fallback:", err);
      loadFallback();
    } finally {
      setLoading(false);
    }
  };

  const loadFallback = () => {
    const savedPosts = localStorage.getItem('primebridge_blog_posts');
    if (savedPosts) {
      try {
        setBlogPosts(JSON.parse(savedPosts));
        return;
      } catch (e) {
        console.error("Failed to parse saved blog posts");
      }
    }
    setBlogPosts(initialPosts);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addPost = async (post) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (res.ok) {
        await fetchBlogs();
        return true;
      }
    } catch (err) {
      console.error("API error adding post, saving locally:", err);
    }
    
    // Local fallback
    const updated = [{ ...post, id: Date.now() }, ...blogPosts];
    setBlogPosts(updated);
    localStorage.setItem('primebridge_blog_posts', JSON.stringify(updated));
    return true;
  };

  const deletePost = async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchBlogs();
        return true;
      }
    } catch (err) {
      console.error("API error deleting post, deleting locally:", err);
    }

    // Local fallback
    const updated = blogPosts.filter(post => post.id !== id);
    setBlogPosts(updated);
    localStorage.setItem('primebridge_blog_posts', JSON.stringify(updated));
    return true;
  };

  const getPostById = async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        const post = await res.json();
        return post;
      }
    } catch (err) {
      console.error("API error fetching post details, using local cache:", err);
    }
    return blogPosts.find(post => post.id.toString() === id.toString());
  };

  return (
    <BlogContext.Provider value={{ blogPosts, addPost, deletePost, getPostById, loading, refreshBlogs: fetchBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

