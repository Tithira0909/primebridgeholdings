import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Trash2, Plus, X } from 'lucide-react';
import './AdminBlog.css';

const AdminBlog = () => {
  const { blogPosts, addPost, deletePost } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: ''
  });

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.excerpt) {
      addPost({
        ...newPost,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      setIsModalOpen(false);
      setNewPost({ title: '', excerpt: '', author: '', category: '' });
    }
  };

  return (
    <div className="admin-dashboard animate-fade-in">
      <div className="dashboard-header">
        <h1>Content Management System</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Blog Post
        </button>
      </div>

      <div className="dashboard-card">
        <h2>Published Posts</h2>
        {blogPosts.length === 0 ? (
          <p className="no-posts">No blog posts found.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td><span className="badge">{post.category}</span></td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
                    <td>
                      <button className="btn-icon delete" onClick={() => deletePost(post.id)} title="Delete Post">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h2>Add New Blog Post</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddPost}>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={newPost.title} 
                  onChange={e => setNewPost({...newPost, title: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input 
                  type="text" 
                  value={newPost.category} 
                  onChange={e => setNewPost({...newPost, category: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input 
                  type="text" 
                  value={newPost.author} 
                  onChange={e => setNewPost({...newPost, author: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Excerpt / Content</label>
                <textarea 
                  rows="4"
                  value={newPost.excerpt} 
                  onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                  required 
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
