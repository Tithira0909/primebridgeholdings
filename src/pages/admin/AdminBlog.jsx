import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Trash2, Plus, X, Upload } from 'lucide-react';
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@blocknote/mantine/style.css";
import './AdminBlog.css';

// Localized rich block editor component
const BlockNoteEditor = ({ onChange }) => {
  const editor = useCreateBlockNote();
  return (
    <BlockNoteView 
      editor={editor} 
      onChange={() => {
        onChange(editor.document);
      }}
      theme="light"
    />
  );
};

const AdminBlog = () => {
  const { blogPosts, addPost, deletePost } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState('');
  const [blocksContent, setBlocksContent] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Save base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.excerpt) {
      addPost({
        ...newPost,
        image: image,
        content: blocksContent,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      setIsModalOpen(false);
      setNewPost({ title: '', excerpt: '', author: '', category: '' });
      setImage('');
      setBlocksContent([]);
    }
  };

  return (
    <div className="admin-dashboard animate-fade-in" data-lenis-prevent>
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
          <div className="modal-content animate-fade-in" style={{ maxWidth: '800px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
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
                <label>Blog Cover Image</label>
                <div className="image-upload-wrapper" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  <label className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0, padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    <Upload size={16} /> Upload Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                  {image && (
                    <div style={{ position: 'relative' }}>
                      <img src={image} alt="Preview" style={{ height: '50px', width: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                      <button type="button" onClick={() => setImage('')} style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px', padding: 0 }}>✕</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Excerpt / Short Summary</label>
                <textarea 
                  rows="2"
                  value={newPost.excerpt} 
                  onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                  placeholder="Provide a short summary to show in the blog card..."
                  required 
                ></textarea>
              </div>
              <div className="form-group">
                <label>Rich Content (Block Editor)</label>
                <div className="blocknote-editor-container" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', minHeight: '300px', backgroundColor: '#fff', color: '#000', textAlign: 'left', marginTop: '0.5rem' }}>
                  <MantineProvider>
                    <BlockNoteEditor onChange={(blocks) => setBlocksContent(blocks)} />
                  </MantineProvider>
                </div>
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
