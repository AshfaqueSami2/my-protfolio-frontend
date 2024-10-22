import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/auth/authApi';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      console.log('Login API Response:', response);

      const { token, data } = response;

      if (!data || !token) {
        throw new Error('User or token object is missing in the response.');
      }

      console.log('Token:', token);
      console.log('User Data:', data);

      // Store token in localStorage for later authentication
      localStorage.setItem('token', token);
      localStorage.setItem('role', data.role); // Store the role for future reference

      // If the logged-in user is an admin, redirect to dashboard
      if (data.role === 'admin') {
        toast.success('Login successful! Redirecting to dashboard...');
        // Ensure that token is saved properly before redirect
        setTimeout(() => {
          navigate('/adminDashboard');
        }, 1000); // Delay for a smoother experience
      } else {
        setErrorMessage('Unauthorized access. Only admins can log in.');
        toast.error('Unauthorized access. Only admins can log in.');
      }
    } catch (error: any) {
      console.error('Login error: ', error);

      // Extract error message from response
      const errorMessage = error?.data?.message || 'An error occurred. Please try again.';

      // Show error message via toast
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md bg-gray-800 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Admin Login</h2>

        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password type
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Toggle password visibility icon */}
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-gray-400 text-xl" />
              ) : (
                <AiFillEye className="text-gray-400 text-xl" />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
