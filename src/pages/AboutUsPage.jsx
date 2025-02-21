import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-dark text-white text-center px-4 sm:px-6"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl bg-glass backdrop-blur-lg text-gray-800 p-6 sm:p-10 rounded-lg shadow-lg">
        {/* Title with Animation */}
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-primary"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          🍔 About FastFood AR 🍕
        </motion.h1>
        
        {/* Introduction */}
        <motion.p 
          className="text-lg sm:text-xl mt-4 text-gray-700 font-semibold"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Welcome to <strong>FastFood AR</strong> – where your cravings meet **cutting-edge Augmented Reality (AR) technology**! 🎉  
          Imagine previewing your meal in **3D** before ordering—seeing its **size, texture, and delicious details** like never before. 🤩  
          Say goodbye to surprises and hello to an **interactive, mouthwatering experience!** 🍽️✨
        </motion.p>

        {/* Features List */}
        <motion.div 
          className="mt-6 text-left space-y-4"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-red-500 font-bold">🔥 What Makes FastFood AR Special? 🍟</h2>
          <ul className="list-disc list-inside text-gray-800 font-semibold text-lg sm:text-base">
            <li>👀 <strong>See Before You Eat</strong> – Get a real-time **3D preview** of every dish.</li>
            <li>🍔 <strong>Make Informed Choices</strong> – Know exactly what you're ordering, including portion sizes.</li>
            <li>📲 <strong>No App Required</strong> – Just scan, select, and explore directly in your browser.</li>
            <li>🚀 <strong>Next-Gen Dining</strong> – Blending technology with food for a **fun & immersive experience**.</li>
            <li>🎯 <strong>Precision & Accuracy</strong> – The most realistic digital food preview ever!</li>
          </ul>
        </motion.div>

        {/* Closing Statement */}
        <motion.p 
          className="text-lg sm:text-xl mt-6 text-gray-700 font-semibold"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          We believe that food should be more than just a meal—it should be an **adventure!** 🌍🍽️  
          With **FastFood AR**, ordering food is no longer a **guessing game**, but an **exciting, interactive journey!** 🏆  
        </motion.p>

        {/* Back Button with Animation */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link to="/landing">
            <Button>🏠 Back to Home</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
