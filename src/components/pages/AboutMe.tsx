import React from 'react';
import { motion } from 'framer-motion'; // For animations

const AboutMe: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-900 text-white font-poppins">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Title */}
        <motion.h2 
          className="text-5xl font-bold text-center mb-12" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h2>

        {/* Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Personal Introduction Card */}
          <motion.div 
            className="p-6 rounded-lg shadow-md border border-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 hover:rotate-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-200">Who Am I?</h3>
            <p className="text-lg text-gray-400">
              I'm <span className="font-semibold text-indigo-400">Md Ashfaque Hossain Sami</span>, a Full Stack Web Developer passionate about creating scalable and user-friendly applications. I love solving complex challenges and staying up-to-date with the latest technologies.
            </p>
          </motion.div>

          {/* Combined Languages & Technologies Section */}
          <motion.div 
            className="p-6 rounded-lg shadow-md border border-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 hover:rotate-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-200">Languages & Technologies</h3>
            <p className="text-lg text-gray-400 mb-4">
              Here are the languages and technologies I work with:
            </p>
            {/* Shields.io Badges for Languages & Technologies */}
            <div className="flex flex-wrap space-y-2">
              {/* Languages */}
              <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge" />
              <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge" />

              {/* Technologies */}
              <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML Badge" />
              <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Badge" />
              <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge" />
              <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Badge" />
              <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge" />
              <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge" />
              <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js Badge" />
              <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge" />
              <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap Badge" />
              <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Badge" />
              <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js Badge" />
            </div>
          </motion.div>

          {/* Interests or Hobbies Card */}
          <motion.div 
            className="p-6 rounded-lg shadow-md border border-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 hover:rotate-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-200">Outside of Work</h3>
            <p className="text-lg text-gray-400">
              When I'm not coding, I enjoy hiking, reading tech blogs, and exploring the latest advancements in AI and web development. Staying active and continuously learning are big parts of who I am.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
