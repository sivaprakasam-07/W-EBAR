import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-700 to-yellow-500 text-white text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-6 drop-shadow-lg"
      >
        Welcome to KFC AR Experience
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-lg mb-8 max-w-2xl"
      >
        Explore your favorite fast-food items in Augmented Reality. Click below to start your immersive journey.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/menu">
          <Button className="bg-white text-red-600 font-bold px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-gray-200 transition-all">
            Explore Menu
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
