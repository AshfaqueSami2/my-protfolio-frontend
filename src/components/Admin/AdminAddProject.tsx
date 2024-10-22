import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddProjectMutation } from '../../redux/api/api';
import { ScaleLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';

const AdminAddProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrls, setRepoUrls] = useState(''); // For multiple repository URLs
  const [imageUrls, setImageUrls] = useState(''); // For multiple image URLs
  const [features, setFeatures] = useState(''); // For project features
  const [addProject, { isLoading }] = useAddProjectMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
      technologies: technologies.split(',').map((tech) => tech.trim()),
      liveUrl,
      githubLinks: repoUrls.split(',').map((url) => url.trim()), // Multiple repo URLs
      imageUrls: imageUrls.split(',').map((url) => url.trim()), // Multiple image URLs
      features: features.split(',').map((feature) => feature.trim()), // Project features
    };

    try {
      await addProject(projectData).unwrap();
      toast.success('Project added successfully!');
      setTimeout(() => {
        navigate('/adminDashboard');
      }, 1500);
    } catch (error) {
      console.error('Failed to add project: ', error);
      toast.error('Failed to add project. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-500">Add New Project</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Project Title</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Description</label>
          <textarea
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Technologies (comma separated)</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Live URL</label>
          <input
            type="url"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Repository URLs (comma separated)</label>
          <input
            type="url"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={repoUrls}
            onChange={(e) => setRepoUrls(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Image URLs (comma separated)</label>
          <input
            type="url"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Features (comma separated)</label>
          <textarea
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? <ScaleLoader height={20} color="#fff" /> : 'Add Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProject;
