import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateEducationMutation, useGetAllEducationQuery } from '../../redux/api/api'; // Import the hooks
import toast from 'react-hot-toast'; // For toast notifications

const AdminUpdateEducation: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the education ID from the URL
  const navigate = useNavigate();

  const { data: educationResponse, refetch } = useGetAllEducationQuery(null); // Get all education data
  const [updateEducation] = useUpdateEducationMutation(); // Hook for updating education

  // Find the specific education entry by ID
  const education = educationResponse?.data?.find((edu: any) => edu._id === id);

  // Form state
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    honors: '',
    certifications: '',
  });

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree,
        institution: education.institution,
        fieldOfStudy: education.fieldOfStudy,
        startDate: education.startDate,
        endDate: education.endDate || '',
        honors: education.honors || '',
        certifications: education.certifications.join(', ') || '',
      });
    }
  }, [education]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Optimistically update UI immediately
      const optimisticUpdate = {
        id,
        educationData: {
          ...formData,
          certifications: formData.certifications.split(',').map((cert) => cert.trim()),
        },
      };

      // Call the mutation to update education
      await updateEducation(optimisticUpdate).unwrap();

      // Toast notification on success
      toast.success('Education updated successfully');
      
      // Refetch education data to show the latest data
      refetch();

      // Redirect back to the education view page
      navigate('/adminDashboard/seeEducation');
    } catch (error) {
      // Toast notification on error
      toast.error('Failed to update education');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-indigo-500 text-center">Update Education</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
        <div>
          <label className="block text-lg text-gray-300 mb-2">Degree</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Institution</label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Field of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Honors</label>
          <input
            type="text"
            name="honors"
            value={formData.honors}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-300 mb-2">Certifications</label>
          <textarea
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg transition duration-300"
        >
          Update Education
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateEducation;
