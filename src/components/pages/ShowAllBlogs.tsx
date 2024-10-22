import React from 'react';
import { useGetAllBlogsQuery } from '../../redux/api/api'; // Import the API hook for fetching blogs
import { ScaleLoader } from 'react-spinners'; // For loading spinner
import { motion } from 'framer-motion'; // For animation
import { useNavigate } from 'react-router-dom'; // For navigation

const ShowAllBlogs: React.FC = () => {
  // Fetch all blogs using the Redux query hook
  const { data: blogsResponse, isLoading, error } = useGetAllBlogsQuery(null);
  const blogs = blogsResponse?.data;
  const navigate = useNavigate(); // Hook for navigation

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
    <section className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <h2 className="text-4xl font-bold text-center mb-16 text-indigo-500">
          Latest Blogs
        </h2>

        {/* Display only the first 3 blogs */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.slice(0, 3).map((blog: any) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Blog Image */}
              {blog.imageUrl && (
                <div className="mb-4">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full object-cover rounded-lg"
                    style={{ height: '200px' }} // Adjust the height of the image
                  />
                </div>
              )}

              {/* Blog Title */}
              <h3 className="text-2xl font-semibold text-indigo-400 mb-2">{blog.title}</h3>

              {/* Blog Author */}
              <p className="text-gray-300 mb-4">By {blog.author}</p>

              {/* Blog Excerpt (limit to 12-13 words) */}
              <p className="text-gray-400 text-lg">
                {blog.content.split(" ").slice(0, 12).join(" ")}... {/* Show only 12-13 words */}
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

              {/* Read More Button */}
              <div className="mt-4">
                <button
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show All Blogs Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/blogs')}
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Show All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShowAllBlogs;
