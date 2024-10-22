import React, { useState } from "react";
import { Link } from "react-scroll"; // Use react-scroll for smooth scrolling
import { FiMenu } from "react-icons/fi"; // For the hamburger menu

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for toggling the mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false); // Close menu when an option is selected
  };

  // Styles for the logo glow effect
  const logoStyles: React.CSSProperties = {
    borderRadius: "50%", // Ensure the logo is perfectly round
    overflow: "hidden", // Prevent any overflow
    transition: "all 0.4s ease-in-out",
  };

  // Styles for the hover state
  const logoHoverStyles: React.CSSProperties = {
    boxShadow: "0 0 30px 10px rgba(255, 255, 255, 0.6)", // Glowing light from under the logo
    transform: "scale(1.1)", // Slight scaling effect
  };

  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="py-4 px-6 bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left side */}
        <Link to="home">
          <div
            className="flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? { ...logoStyles, ...logoHoverStyles } : logoStyles} // Apply styles based on hover
          >
            <img
              src="https://i.ibb.co/J5xybV6/Gemini-Generated-Image-w8tfqgw8tfqgw8tf.jpg"
              alt="Logo"
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
        </Link>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="home" // Navigate to home section
            spy={true}
            smooth={true}
            offset={-70} // Adjust offset if your navbar is fixed
            duration={500}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            to="about" // Navigate to about section
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
          >
            About Me
          </Link>
          <Link
            to="projects" // Navigate to projects section
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
          >
            Projects
          </Link>
          <Link
            to="blogs" // Navigate to blogs section
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
          >
            Blogs
          </Link>
          <Link
            to="contact" // Navigate to contact section
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger menu button */}
        <div className="md:hidden">
          <button
            className="text-gray-400 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <FiMenu className="w-8 h-8" /> {/* Hamburger icon */}
          </button>

          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg">
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="block px-4 py-2 text-gray-400 hover:text-white transition duration-300"
                onClick={handleCloseMenu}
              >
                About Me
              </Link>
              <Link
                to="projects"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="block px-4 py-2 text-gray-400 hover:text-white transition duration-300"
                onClick={handleCloseMenu}
              >
                Projects
              </Link>
              <Link
                to="blogs"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="block px-4 py-2 text-gray-400 hover:text-white transition duration-300"
                onClick={handleCloseMenu}
              >
                Blogs
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="block px-4 py-2 text-gray-400 hover:text-white transition duration-300"
                onClick={handleCloseMenu}
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
