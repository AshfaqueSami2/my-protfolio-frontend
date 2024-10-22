import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProjectByIdQuery, useUpdateProjectMutation } from '../../redux/api/api'; // Import hooks
import toast from 'react-hot-toast'; // For toast notifications

const AdminEditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get project ID from the URL
  const navigate = useNavigate();
  
  // Fetch project by ID
  const { data: projectResponse, isLoading, error } = useGetProjectByIdQuery(id, {
    refetchOnMountOrArgChange: true, // Ensures it always fetches fresh data
  });
  const project = projectResponse?.data;
  
  // Mutation hook for updating the project
  const [updateProject] = useUpdateProjectMutation();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrls: '',
    technologies: '',
    features: '',
    githubLinks: '',
    liveUrl: '',
  });

  // Fill form with project data when the project is fetched
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        imageUrls: project.imageUrls.join(', ') || '',
        technologies: project.technologies.join(', ') || '',
        features: project.features.join(', ') || '',
        githubLinks: project.githubLinks.join(', ') || '',
        liveUrl: project.liveUrl || '',
      });
    }
  }, [project]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare the data to be sent to the server
      const updatedProjectData = {
        ...formData,
        imageUrls: formData.imageUrls.split(',').map((url) => url.trim()),
        technologies: formData.technologies.split(',').map((tech) => tech.trim()),
        features: formData.features.split(',').map((feature) => feature.trim()),
        githubLinks: formData.githubLinks.split(',').map((link) => link.trim()),
      };

      // Call the updateProject mutation
      await updateProject({ id, projectData: updatedProjectData }).unwrap();
      toast.success('Project updated successfully');
      
      // Invalidate the cache and refetch the data
      navigate('/adminDashboard/viewProject'); // Redirect to project list after update
    } catch (error) {
      toast.error('Failed to update project');
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
    return <div>Error loading project details.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-indigo-500 text-center">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        <div>
          <label className="block text-lg text-gray-300 mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Image URLs (comma-separated)</label>
          <input
            type="text"
            name="imageUrls"
            value={formData.imageUrls}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Technologies (comma-separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Features (comma-separated)</label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">GitHub Links (comma-separated)</label>
          <input
            type="text"
            name="githubLinks"
            value={formData.githubLinks}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Live URL</label>
          <input
            type="text"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg transition duration-300"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default AdminEditProject;
