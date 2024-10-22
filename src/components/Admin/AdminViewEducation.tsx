import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllEducationQuery, useDeleteEducationMutation } from '../../redux/api/api';
import { ScaleLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminViewEducation: React.FC = () => {
  const navigate = useNavigate();

  // Fetch all education data using the Redux query hook
  const { data: educationResponse, isLoading, error, refetch } = useGetAllEducationQuery(null);
  const [deleteEducation] = useDeleteEducationMutation();

  // Access the 'data' field in the response
  const educationList = educationResponse?.data;

  // State for modal visibility and selected education
  const [showModal, setShowModal] = useState(false);
  const [selectedEducationId, setSelectedEducationId] = useState<string | null>(null);

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
        <p>Error loading education data.</p>
      </div>
    );
  }

  // Function to handle delete education
  const confirmDelete = async () => {
    if (selectedEducationId) {
      try {
        await deleteEducation(selectedEducationId).unwrap();
        toast.success('Education entry deleted successfully');
        setShowModal(false);
        refetch(); // Refetch the education list after successful deletion to update the UI
      } catch (error) {
        toast.error('Failed to delete education');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Education Details</h1>
        <button
          onClick={() => navigate('/adminDashboard/setEducation')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Education
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {educationList?.map((education: any) => (
          <motion.div
            key={education._id}
            whileHover={{ scale: 1.05 }}
            className="relative bg-gray-800 p-6 rounded-lg shadow-md transition-transform"
          >
            {education.instituePicture && (
              <div className="absolute -top-4 left-4 h-16 w-16 rounded-lg grid place-items-center shadow-lg">
                <img
                  src={education.instituePicture}
                  alt={education.institution}
                  className="h-16 w-16 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="ml-20">
              <h2 className="text-xl font-semibold text-orange-500">{education.degree}</h2>
              <p className="text-gray-400">{education.institution}</p>
              <p className="text-gray-400">
                {education.fieldOfStudy} ({new Date(education.startDate).getFullYear()} -{' '}
                {education.endDate ? new Date(education.endDate).getFullYear() : 'Present'})
              </p>

              {education.honors && (
                <p className="text-gray-300 mt-2">
                  <strong>Honors:</strong> {education.honors}
                </p>
              )}

              {education.certifications && education.certifications.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-gray-300 font-semibold">Certifications:</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {education.certifications.map((cert: string, index: number) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => navigate(`/adminDashboard/adminUpdateEducation/${education._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedEducationId(education._id);
                    setShowModal(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Are you sure?</h3>
            <p className="text-gray-400 mb-6">Do you really want to delete this education entry? This action cannot be undone.</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewEducation;
