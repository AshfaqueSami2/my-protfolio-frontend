import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Import some icons for contact details
import { motion } from 'framer-motion'; // For animations

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Contact Information
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Card 1 */}
          <motion.div
            className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <FaPhone className="text-4xl text-indigo-400" />
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-gray-300">+123 456 789</p>
            </div>
          </motion.div>

          {/* Contact Card 2 */}
          <motion.div
            className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <FaEnvelope className="text-4xl text-indigo-400" />
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-gray-300">samsaimma@gmail.com</p>
            </div>
          </motion.div>

          {/* Contact Card 3 */}
          <motion.div
            className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <FaMapMarkerAlt className="text-4xl text-indigo-400" />
            <div>
              <h3 className="text-xl font-semibold">Address</h3>
              <p className="text-gray-300">Chittagong,Bangldesh</p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          className="mt-12 bg-gray-700 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm text-gray-400">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-400">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 text-sm text-gray-400">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
