import React from 'react';
import { NewtonsCradle } from '@uiball/loaders'; // Import the loader

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <NewtonsCradle 
        size={50} 
        speed={1.4} 
        color="#4A90E2" // Adjust the color to fit with your design
      />
    </div>
  );
};

export default Loader;
