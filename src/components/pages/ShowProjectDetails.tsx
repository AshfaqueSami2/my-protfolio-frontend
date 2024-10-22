import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectByIdQuery } from '../../redux/api/api'; // Import the API hook for fetching projects by ID
import { ScaleLoader } from 'react-spinners'; // For loading spinner
import { motion } from 'framer-motion'; // For animation
import { FaGithub } from 'react-icons/fa'; // GitHub icon from react-icons

const ShowProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL
  const { data: project, isLoading, error } = useGetProjectByIdQuery(id); // Fetch the project by ID

  // State for the image slideshow
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image slideshow logic with interval
  useEffect(() => {
    const imageUrls = project?.data?.imageUrls || [];
    if (imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length); // Cycle through the images
      }, 2000); // Change the image every 2 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ScaleLoader color="#4A90E2" height={50} />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center text-white bg-gray-900 h-screen flex justify-center items-center">
        <p>Error loading project details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Animated Slideshow for Project Images */}
      {project.data.imageUrls && project.data.imageUrls.length > 0 && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img
            src={project.data.imageUrls[currentImageIndex]} // Show the current image based on state
            alt={project.data.title}
            className="w-full object-contain rounded-lg shadow-lg"
            style={{ maxHeight: '600px' }} // Ensures the image stays within the card's height
          />
        </motion.div>
      )}

      {/* Project Title */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-indigo-500 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {project.data.title}
      </motion.h1>
      
      {/* Project Description */}
      <motion.p
        className="text-lg mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {project.data.description}
      </motion.p>

      {/* Technologies */}
      {project.data.technologies && project.data.technologies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h4 className="text-2xl font-bold mb-2 text-indigo-500">Technologies:</h4>
          <ul className="flex flex-wrap gap-2 mb-6 justify-center">
            {project.data.technologies.map((tech: string, index: number) => (
              <li
                key={index}
                className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Features */}
      {project.data.features && project.data.features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h4 className="text-2xl font-bold mb-2 text-indigo-500">Features:</h4>
          <ul className="list-disc pl-5 text-gray-300 mb-6">
            {project.data.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Project Links with GitHub Icon */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h4 className="text-2xl font-bold mb-4 text-indigo-500 text-center">Project Links:</h4>
        <div className="flex justify-center space-x-6">
          {project.data.liveUrl && (
            <a
              href={project.data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors duration-300"
            >
              Live Preview
            </a>
          )}
          {/* GitHub Links with GitHub Icon */}
          {project.data.githubLinks && project.data.githubLinks[0] && (
            <a
              href={project.data.githubLinks[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors duration-300"
            >
              <FaGithub className="mr-2" /> GitHub Frontend
            </a>
          )}
          {project.data.githubLinks && project.data.githubLinks[1] && (
            <a
              href={project.data.githubLinks[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors duration-300"
            >
              <FaGithub className="mr-2" /> GitHub Backend
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ShowProjectDetails;
