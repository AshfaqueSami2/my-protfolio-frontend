import React from 'react';
import { useGetAllEducationQuery } from '../../redux/api/api'; // Import the API hook
import { ScaleLoader } from 'react-spinners'; // For loading spinner
import { motion } from 'framer-motion'; // For animation
import { useInView } from 'react-intersection-observer'; // For scroll detection

const ShowEducation: React.FC = () => {
  const { data: educationResponse, isLoading, error } = useGetAllEducationQuery(null);
  const educationList = educationResponse?.data;

  // Intersection observer to detect when the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.3, // Trigger when 30% of the section is visible
  });

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

  // Helper function to split text into letters and animate them
  const animateText = (text: string) => {
    return text.split("").map((letter, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.05, type: 'spring', stiffness: 100, damping: 10 }}
        className="inline-block"
      >
        {letter === " " ? "\u00A0" : letter} 
      </motion.span>
    ));
  };

  return (
    <section className="bg-gray-900 text-white py-12" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-indigo-500">
          {animateText("My Education")}
        </h2>

        <div className="space-y-12">
          {educationList?.map((education: any) => (
            <motion.div
              key={education._id}
              initial={{ opacity: 0, x: -50 }} // Starting state (offscreen to the left)
              animate={inView ? { opacity: 1, x: 0 } : {}} // Animate to visible when in view
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)' }} // Add hover effect
              className="flex items-start bg-gray-800 p-8 rounded-lg shadow-lg transition-all"
            >
              {/* Institute Picture */}
              {education.instituePicture && (
                <img
                  src={education.instituePicture}
                  alt={education.institution}
                  className="h-20 w-20 object-cover rounded-lg mr-6 shadow-lg"
                />
              )}

              {/* Education Details */}
              <div>
                <h3 className="text-2xl font-semibold text-indigo-400">
                  {animateText(education.degree)}
                </h3>
                <p className="text-gray-300 text-lg">{animateText(education.institution)}</p>
                <p className="text-gray-400">
                  {animateText(`${education.fieldOfStudy} (${new Date(education.startDate).getFullYear()} - ${education.endDate ? new Date(education.endDate).getFullYear() : 'Present'})`)}
                </p>

                {/* Optional Honors */}
                {education.honors && (
                  <p className="text-gray-300 mt-2">
                    <strong>Honors:</strong> {animateText(education.honors)}
                  </p>
                )}

                {/* Certifications */}
                {education.certifications && education.certifications.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-gray-300 font-semibold">Certifications:</h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {education.certifications.map((cert: string, index: number) => (
                        <li key={index}>{animateText(cert)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowEducation;
