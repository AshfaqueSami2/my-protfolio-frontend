import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion'; // Import Framer Motion

const Banner: React.FC = () => {
  const [displayText, setDisplayText] = useState<string[] | null>(null);

  // Load the click sound (assuming you have the sound file stored locally or hosted)
  const clickSound = new Audio('/src/assets/mouse-click-104737.mp3'); // Update with your sound file path

  // Split the "Full Stack Web Developer" text for the typing effect with proper spaces
  useEffect(() => {
    const text = "Full Stack Web Developer";
    const letters = text.split("").map((letter, index) => (
      <span
        key={index}
        className="inline-block opacity-0 text-transparent animate-typing"
        style={{ animationDelay: `${index * 0.1}s`, letterSpacing: '0.05em' }}
      >
        {letter === " " ? "\u00A0" : letter} {/* Handle spaces */}
      </span>
    ));
    setDisplayText(letters as any);
  }, []);

  // Animation for text block (e.g., "Hello, I'm")
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  // Animation for image
  const imageAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 800 },
  });

  // Function to play sound when button is clicked
  const playSound = () => {
    clickSound.play();
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Centered content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left side - Introduction */}
        <animated.div
          style={animationProps}
          className="space-y-4 text-center md:text-left md:max-w-lg md:mr-12 lg:mr-16 mt-8 md:mt-0"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-300">Hello, I'm</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Md Ashfaque Hossain <span className="text-indigo-500">Sami</span>
          </h1>
          {/* Typing Effect on "Full Stack Web Developer" */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400">
            {displayText}
          </h2>
          {/* Download CV with Framer Motion */}
          <a
            href="https://docs.google.com/document/d/1UsKrl7BnlX0LZWLU0wNkDerY7HuFaCWetsDErlEDE4A/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playSound} // Play sound on click
          >
            <motion.button
              whileHover={{
                scale: 1.1, // Slightly increase size
                rotate: 3,  // Slight rotation
                backgroundColor: "#4F46E5", // Change background color on hover
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Add shadow
              }}
              whileTap={{ scale: 0.9 }} // On tap, shrink slightly
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth animation
              className="mt-6 px-6 sm:px-8 py-3 bg-gray-800 text-white text-md sm:text-lg rounded-lg border border-white hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              Download CV
            </motion.button>
          </a>
        </animated.div>

        {/* Right side - Profile Image */}
        <animated.div style={imageAnimation} className="relative mt-8 md:mt-0">
          <img
            src="https://i.ibb.co.com/bHp17Bg/download-removebg-preview.jpg"
            alt="Md Ashfaque Hossain Sami"
            className="rounded-full w-40 sm:w-56 md:w-64 lg:w-[28rem] h-auto object-cover shadow-xl"
          />
        </animated.div>
      </div>
    </div>
  );
};

export default Banner;
