import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddBlogMutation } from '../../redux/api/api'; // Assuming this API endpoint exists for adding blogs
import { ScaleLoader } from 'react-spinners'; // Optional: Loading spinner for when submitting form
import toast, { Toaster } from 'react-hot-toast'; // For showing toast notifications

const AdminAddBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [addBlog, { isLoading }] = useAddBlogMutation(); // Hook for adding a blog
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create blog data object
    const blogData = {
      title,
      content,
      author,
      tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated string to array
      category,
      imageUrl,
    };

    try {
      // Call the mutation function to add the blog
      await addBlog(blogData).unwrap();
      toast.success('Blog added successfully!');
      setTimeout(() => {
        navigate('/adminDashboard'); // Redirect to the dashboard after successful submission
      }, 1500); // Delay for 1.5 seconds to show toast before redirecting
    } catch (error) {
      console.error('Failed to add blog: ', error);
      toast.error('Failed to add blog. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Toaster position="top-right" reverseOrder={false} /> {/* This renders the toast notifications */}
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-500">Add New Blog</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Blog Title</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Content</label>
          <textarea
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Author</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Image URL</label>
          <input
            type="url"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? <ScaleLoader height={20} color="#fff" /> : 'Add Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddBlog;
