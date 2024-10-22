import React, { useState } from 'react';
import { useGetAllProjectsQuery, useDeleteProjectMutation } from '../../redux/api/api'; // Import the API hooks
import { ScaleLoader } from 'react-spinners'; // Optional: Loading spinner for fetching data
import { motion } from 'framer-motion'; // For animation
import { useNavigate } from 'react-router-dom'; // For navigation
import toast from 'react-hot-toast'; // For toast notifications

const AdminViewProject: React.FC = () => {
  const navigate = useNavigate();

  // Use the Redux Toolkit Query hook to fetch all projects
  const { data: projectsResponse, isLoading, error, refetch } = useGetAllProjectsQuery(null);
  const projects = projectsResponse?.data;

  const [deleteProject] = useDeleteProjectMutation(); // Hook for deleting a project

  // State for modal visibility and selected project ID
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleCreateProject = () => {
    navigate('/adminDashboard/addProject'); // Navigate to create project page
  };

  const handleDelete = async () => {
    if (selectedProjectId) {
      try {
        await deleteProject(selectedProjectId).unwrap();
        toast.success('Project deleted successfully');
        setShowModal(false);
        refetch(); // Refetch projects after deletion to update the UI
      } catch (error) {
        toast.error('Failed to delete project');
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
        <p>Error loading projects.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 text-white py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-bold text-orange-500">All Projects</h2>
          <button
            onClick={handleCreateProject}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Create Project
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project: any) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Project Images */}
              {project.imageUrls && project.imageUrls.length > 0 && (
                <div className="mb-4">
                  {project.imageUrls.map((imageUrl: string, index: number) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={project.title}
                      className="h-40 w-full object-cover rounded-lg mb-2"
                    />
                  ))}
                </div>
              )}

              {/* Project Title */}
              <h3 className="text-2xl font-semibold text-orange-400 mb-2">{project.title}</h3>

              {/* Project Description */}
              <p className="text-gray-300 text-lg mb-4">{project.description}</p>

              {/* Technologies */}
              {project.technologies && (
                <div className="mb-4">
                  <h4 className="text-orange-400 font-bold">Technologies:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, index: number) => (
                      <li
                        key={index}
                        className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
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
                  <h4 className="text-orange-400 font-bold">Features:</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {project.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Links */}
              <div className="flex flex-col space-y-2 mt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    Live Preview
                  </a>
                )}
                {project.githubLinks && project.githubLinks.length > 0 && (
                  <>
                    <h4 className="text-orange-400 font-bold">GitHub Repositories:</h4>
                    {project.githubLinks.map((link: string, index: number) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        {`Repository ${index + 1}`}
                      </a>
                    ))}
                  </>
                )}
              </div>

              {/* Update and Delete buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => navigate(`/adminDashboard/adminEditProject/${project._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedProjectId(project._id);
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

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Are you sure?</h3>
            <p className="text-gray-400 mb-6">
              Do you really want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminViewProject;
