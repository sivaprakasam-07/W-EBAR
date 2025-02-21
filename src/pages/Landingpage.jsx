import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Utensils } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative h-screen flex items-center justify-end px-4 md:px-6 bg-cover bg-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.img
        src="src\assets\landing bg.jpg"
        alt="Landing Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <motion.div 
        className="z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full p-8 text-white pl-10 md:pl-24"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        {/* Left Side: Empty for better layout */}
        <div className="hidden md:block"></div>

        {/* Right Side: Text Content */}
        <div className="text-center md:text-left space-y-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-primary drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Experience KFC in Augmented Reality
          </motion.h1>
          <p className="mt-4 text-lg text-gray-300">
            See your favorite food come to life before ordering! Visualize 3D models of KFC’s crispy chicken, juicy burgers, and delicious meals.
          </p>

          {/* Buttons with Animation */}
          <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start gap-6">
            <a href="https://we-bar-007.web.app/" target="_blank" rel="noopener noreferrer">
              <motion.button 
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Flame /> Explore Menu
              </motion.button>
            </a>
            <Link to="/about">
              <motion.button 
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Utensils /> About Us
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
