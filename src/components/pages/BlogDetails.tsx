import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../../redux/api/api'; // Import the API hook for fetching a blog by ID
import { ScaleLoader } from 'react-spinners'; // For loading spinner
import { motion } from 'framer-motion'; // For animations

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the blog ID from the URL
  const { data: blogResponse, isLoading, error } = useGetBlogByIdQuery(id); // Fetch the blog by ID

  // Access blog data inside blogResponse
  const blog = blogResponse?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ScaleLoader color="#4A90E2" height={50} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center text-white bg-gray-900 h-screen flex justify-center items-center">
        <p>Error loading blog details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <section className="bg-gray-900 text-white py-12 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Blog Image */}
            {blog.imageUrl && (
              <div className="mb-8">
                <motion.img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full object-cover rounded-lg"
                  style={{ height: '400px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            )}

            {/* Blog Title */}
            <h1 className="text-4xl font-bold text-indigo-500 mb-4">{blog.title}</h1>

            {/* Blog Author */}
            <p className="text-gray-400 mb-4">By {blog.author}</p>

            {/* Blog Content */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {blog.content}
            </p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Category */}
            {blog.category && (
              <p className="mt-4 text-indigo-400 font-bold">Category: {blog.category}</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
