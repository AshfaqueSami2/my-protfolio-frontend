import React from 'react';
import { useGetAllProjectsQuery } from '../../redux/api/api'; // Import the API hook for fetching projects
import { ScaleLoader } from 'react-spinners'; // Optional: Loading spinner for fetching data
import { motion } from 'framer-motion'; // For animation
import { useInView } from 'react-intersection-observer'; // For triggering animation when in view
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ShowProjects: React.FC = () => {
  // Use the Redux Toolkit Query hook to fetch all projects
  const { data: projectsResponse, isLoading, error } = useGetAllProjectsQuery(null);
  const projects = projectsResponse?.data;
  const navigate = useNavigate(); // Initialize useNavigate

  // Intersection observer for detecting when the section comes into view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Trigger the animation when 30% of the section is in view
  });

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
        <p>Error loading projects.</p>
      </div>
    );
  }

  // Letter-by-letter animation for text
  const animateText = (text: string) => {
    return text.split("").map((letter, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 100, damping: 20 }}
        className="inline-block"
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ));
  };

  return (
    <section className="bg-gray-900 text-white py-12" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Projects title with letter-by-letter animation */}
        <h2 className="text-4xl font-bold text-center mb-16 text-indigo-500">
          {animateText("My Projects")}
        </h2>

        {/* Display each project in its own row */}
        <div className="space-y-12">
          {projects?.map((project: any) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row items-start">
                {/* Project Image */}
                {project.imageUrls && project.imageUrls[0] && (
                  <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-6">
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="w-full object-contain rounded-lg"
                      style={{ maxHeight: "500px" }} // Ensures the image stays within the card's height
                    />
                  </div>
                )}

                {/* Project Details */}
                <div className="flex flex-col w-full lg:w-1/2">
                  {/* Project Title with letter animation */}
                  <h3 className="text-3xl font-semibold text-indigo-400 mb-2">
                    {animateText(project.title)}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-300 text-lg mb-4">{project.description}</p>

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="mb-4">
                      <h4 className="text-indigo-400 font-bold">Technologies:</h4>
                      <ul className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, index: number) => (
                          <li
                            key={index}
                            className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Features */}
                  {project.features && (
                    <div className="mb-4">
                      <h4 className="text-indigo-400 font-bold">Features:</h4>
                      <ul className="list-disc pl-5 text-gray-300">
                        {project.features.map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* View More Button */}
                  <div className="mt-4">
                    <button
                       onClick={() => navigate(`/projects/${project._id}`)} // Placeholder action
                      className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowProjects;
