import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '../../redux/api/api';
import toast from 'react-hot-toast';

const AdminUpdateBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: blogResponse, isLoading, error } = useGetBlogByIdQuery(id);
  const blog = blogResponse?.data;
  
  const [updateBlog] = useUpdateBlogMutation();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    author: '',
    category: '',
    tags: '',
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        imageUrl: blog.imageUrl || '',
        author: blog.author || '',
        category: blog.category || '',
        tags: blog.tags.join(', ') || '',
      });
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedBlogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };
      await updateBlog({ id, blogData: updatedBlogData }).unwrap();
      toast.success('Blog updated successfully');
      navigate('/adminDashboard/getAllBlog'); // Redirect after update
    } catch (error) {
      toast.error('Failed to update blog');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blog details.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-indigo-500 text-center">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        <div>
          <label className="block text-lg text-gray-300 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-300 mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-300 mb-2">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-300 mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-300 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-300 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateBlog;
