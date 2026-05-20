import React, { createContext, useState, useContext, useEffect } from 'react';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

const initialPosts = [
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

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState(() => {
    const savedPosts = localStorage.getItem('primebridge_blog_posts');
    if (savedPosts) {
      try {
        return JSON.parse(savedPosts);
      } catch (e) {
        console.error("Failed to parse saved blog posts");
      }
    }
    return initialPosts;
  });

  useEffect(() => {
    localStorage.setItem('primebridge_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const addPost = (post) => {
    setBlogPosts([{ ...post, id: Date.now() }, ...blogPosts]);
  };

  const deletePost = (id) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogPosts, addPost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};
