import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Importing toast for notifications
import { useAddEducationMutation } from '../../redux/api/api';


const AdminSetEducation: React.FC = () => {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [honors, setHonors] = useState('');
  const [certifications, setCertifications] = useState<string[]>([]);
  const [instituePicture, setInstituePicture] = useState('');

  const navigate = useNavigate();
  const [addEducation, { isLoading }] = useAddEducationMutation(); // Redux mutation hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const educationData = {
      degree,
      institution,
      fieldOfStudy,
      startDate,
      endDate,
      honors: honors || undefined, // Send undefined if honors is empty
      certifications: certifications.length > 0 ? certifications : undefined, // Send undefined if no certifications
      instituePicture,
    };

    try {
      await addEducation(educationData).unwrap(); // Perform the mutation
      toast.success('Education added successfully!');
      navigate('/adminDashboard'); // Redirect after successful submission
    } catch (error: any) {
      toast.error('Failed to add education. Please try again.');
    }
  };

  // Handle certifications input
  const handleCertificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const certArray = e.target.value.split(',').map((cert) => cert.trim());
    setCertifications(certArray);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add Education</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Degree */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="degree">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              placeholder="Enter your degree"
            />
          </div>

          {/* Institution */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="institution">
              Institution
            </label>
            <input
              type="text"
              id="institution"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
              placeholder="Enter your institution"
            />
          </div>

          {/* Field of Study */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="fieldOfStudy">
              Field of Study
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              required
              placeholder="Enter your field of study"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          {/* Honors (optional) */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="honors">
              Honors (Optional)
            </label>
            <input
              type="text"
              id="honors"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={honors}
              onChange={(e) => setHonors(e.target.value)}
              placeholder="Enter any honors (optional)"
            />
          </div>

          {/* Certifications (optional) */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="certifications">
              Certifications (Optional, comma separated)
            </label>
            <input
              type="text"
              id="certifications"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={certifications.join(', ')}
              onChange={handleCertificationsChange}
              placeholder="Enter certifications (comma separated)"
            />
          </div>

          {/* Institute Picture */}
          <div>
            <label className="block mb-2 text-sm font-bold" htmlFor="instituePicture">
              Institute Picture URL
            </label>
            <input
              type="text"
              id="instituePicture"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={instituePicture}
              onChange={(e) => setInstituePicture(e.target.value)}
              required
              placeholder="Enter Institute Picture URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSetEducation;
