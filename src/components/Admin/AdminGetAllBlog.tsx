import React, { useState, useEffect } from 'react';
import { useGetAllBlogsQuery, useDeleteBlogMutation } from '../../redux/api/api'; // Import the API hook for fetching and deleting blogs
import { ScaleLoader } from 'react-spinners'; // For loading spinner
import { motion } from 'framer-motion'; // For animation
import { useNavigate } from 'react-router-dom'; // For navigation
import toast from 'react-hot-toast'; // For notifications

const AdminGetAllBlog: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null); // State to track the selected blog for deletion

  // Fetch all blogs using the API hook
  const { data: blogsResponse, isLoading, error } = useGetAllBlogsQuery(null);
  const [blogs, setBlogs] = useState<any[]>([]); // State to hold the blogs list
  const [deleteBlog] = useDeleteBlogMutation(); // Hook for deleting a blog

  // Sync the blogs from the API response with the local state
  useEffect(() => {
    if (blogsResponse?.data) {
      setBlogs(blogsResponse.data);
    }
  }, [blogsResponse]);

  const handleCreateBlog = () => {
    navigate('/adminDashboard/addBlog'); // Redirect to the add blog page
  };

  const handleDelete = async () => {
    if (selectedBlogId) {
      try {
        // Delete the blog from the backend
        await deleteBlog(selectedBlogId).unwrap();
        toast.success('Blog deleted successfully');
        
        // Remove the deleted blog from the local state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== selectedBlogId));
        
        setShowModal(false); // Close the modal after deletion
      } catch (error) {
        toast.error('Failed to delete blog');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ScaleLoader color="#4A90E2" height={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white bg-gray-900 h-screen flex justify-center items-center">
        <p>Error loading blogs.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 text-white py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-bold text-indigo-500">All Blogs</h2>
          <button
            onClick={handleCreateBlog}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Create Blog
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog: any) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Blog Image */}
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
              )}

              {/* Blog Title */}
              <h3 className="text-2xl font-semibold text-indigo-400 mb-2">{blog.title}</h3>

              {/* Blog Author */}
              <p className="text-gray-300 text-lg mb-4">By {blog.author}</p>

              {/* Blog Category */}
              <p className="text-orange-400 font-semibold">Category: {blog.category}</p>

              {/* Blog Tags */}
              {blog.tags && (
                <div className="mb-4">
                  <h4 className="text-indigo-400 font-bold">Tags:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string, index: number) => (
                      <li
                        key={index}
                        className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Blog Content (truncated for preview) */}
              <p className="text-gray-300 text-lg mb-4">
                {blog.content.substring(0, 100)}...
              </p>

              {/* Update and Delete Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/adminDashboard/adminUpdateBlog/${blog._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedBlogId(blog._id);
                    setShowModal(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Are you sure?</h3>
            <p className="text-gray-400 mb-6">
              Do you really want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminGetAllBlog;
