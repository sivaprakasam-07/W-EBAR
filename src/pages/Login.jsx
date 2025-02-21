import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase"; // Import Firebase Auth Config
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-hot-toast"; // Import toast

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google Sign-in Function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      toast.success("Login successful!"); // Show success toast
      navigate("/landing"); // Redirect to landing page
    } catch (error) {
      console.error("Google Sign-in Error:", error.message);
    }
  };

  // Email/Password Sign-in Function
  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCredential.user);
      toast.success("Login successful!"); // Show success toast
      navigate("/landing"); // Redirect to landing page
    } catch (error) {
      console.error("Email Sign-in Error:", error.message);
      setError(error.message); // Display error message
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6">
      {/* Glassmorphism Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl px-8 py-10 max-w-sm w-full text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Welcome Text */}
        <motion.h1
          className="text-3xl font-bold text-white drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome Back!
        </motion.h1>
        <p className="text-gray-300 mt-2">Sign in to continue</p>

        {/* Google Sign-in Button */}
        <motion.button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 mt-6 w-full bg-white text-gray-800 px-6 py-3 rounded-lg shadow-md transition hover:bg-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FcGoogle size={24} />
          <span className="font-semibold">Sign in with Google</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-white/30"></div>
          <span className="px-4 text-gray-300">or</span>
          <div className="flex-1 h-[1px] bg-white/30"></div>
        </div>

        {/* Email & Password Inputs */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/30 text-gray-300 rounded-lg outline-none placeholder-gray-300 focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-3 px-4 py-2 bg-white/10 border border-white/30 text-gray-300 rounded-lg outline-none placeholder-gray-300 focus:ring-2 focus:ring-red-500"
        />

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        {/* Sign-in Button */}
        <motion.button
          onClick={handleEmailSignIn}
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg font-semibold shadow-md transition hover:bg-red-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign in
        </motion.button>

        {/* Sign-up Link */}
        <p className="text-gray-400 text-sm mt-4">
          Don't have an account? <span className="text-red-400 cursor-pointer hover:underline">Sign up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
