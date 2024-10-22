import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners"; // Import ScaleLoader
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a loading state (you can replace this with actual loading logic)
    setTimeout(() => setLoading(false), 2000); // Simulate a 2-second loading time
  }, []);

  const handleLogout = () => {
    // Clear the token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to the login page
    navigate("/adminLogin");
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Function to navigate to a specific route
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        style={{ marginTop: "86px" }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 -translate-x-80 xl:translate-x-0"
      >
        <div className="relative border-b border-white/20">
          <div className="flex items-center gap-4 py-6 px-8">
            <h6 className="text-white text-lg font-semibold">Admin Panel</h6>
          </div>
        </div>
        <div className="m-4">
          <ul className="flex flex-col gap-2">
            <li>
              <div
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white transition-all bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 cursor-pointer"
                onClick={() => handleNavigation("/adminDashboard")}
              >
                <p className="capitalize">Dashboard</p>
              </div>
            </li>
            <li>
              <div
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => handleNavigation("/adminDashboard/seeEducation")}
              >
                <p className="capitalize">Education Details</p>
              </div>
            </li>
            <li>
              <div
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => handleNavigation("/adminDashboard/viewProject")}
              >
                <p className="capitalize">Project Details</p>
              </div>
            </li>
            <li>
              <div
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => handleNavigation("/adminDashboard/getAllBlog")} // Blog navigation
              >
                <p className="capitalize">Blog</p>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 xl:ml-80">
        {/* Header */}
        <nav className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-300">
                <li>
                  <a className="hover:text-blue-500">Dashboard</a>
                </li>
                <li>/</li>
                <li>Home</li>
              </ol>
            </nav>
            <h6 className="text-white text-base font-semibold">Home</h6>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-56">
              <input
                type="text"
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                placeholder="Type here"
              />
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Loading state with ScaleLoader */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ScaleLoader color={"#4A90E2"} loading={loading} height={50} />
          </div>
        ) : (
          <>
            {/* Cards with Framer Motion animations */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[{
                  title: "My Education",
                  color: "bg-gradient-to-br from-blue-600 to-blue-400",
                  onClick: () => handleNavigation("/adminDashboard/seeEducation"),
                },
                {
                  title: "Project Details",
                  color: "bg-gradient-to-br from-pink-600 to-pink-400",
                  onClick: () => handleNavigation("/adminDashboard/viewProject"),
                },
                {
                  title: "Blogs",
                  color: "bg-gradient-to-br from-green-600 to-green-400",
                  onClick: () => handleNavigation("/adminDashboard/getAllBlog"),
                }, // Navigate to Blogs
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-6 rounded-xl shadow-md cursor-pointer transition-transform ${card.color}`}
                  onClick={card.onClick} // Call the onClick handler
                >
                  <div className="absolute -top-4 left-4 h-16 w-16 rounded-xl grid place-items-center shadow-lg">
                    <img
                      src={
                        idx === 0
                          ? "https://i.ibb.co/6XGKzyS/3135768.png"
                          : idx === 1
                          ? "https://i.ibb.co/ZYm8NyV/5956592.png"
                          : "https://i.ibb.co/ZXtY9Hp/9623631.png"
                      }
                      alt={`Card image ${idx + 1}`}
                      className="h-12 w-12 object-cover rounded-xl"
                    />
                  </div>

                  <div className="ml-20 text-right">
                    <p className="text-xl text-white font-semibold">{card.title}</p>
                    <p className="text-sm text-gray-200">View Details</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
