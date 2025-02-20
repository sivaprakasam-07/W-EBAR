import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button";

// Import images
import BurgerImg from "../assets/burger.jpg";
import PizzaImg from "../assets/Pizza.jpg";
import FriesImg from "../assets/FRENCH FRIES.jpg";
import ChickenImg from "../assets/chicken.jpg";
import IceCreamImg from "../assets/Ice cream.jpg";
import SoftDrinkImg from "../assets/cooldrinks.jpg";

const menuItems = [
  { name: "🍔 Burger", img: BurgerImg },
  { name: "🍕 Pizza", img: PizzaImg },
  { name: "🍟 Fries", img: FriesImg },
  { name: "🍗 Chicken", img: ChickenImg },
  { name: "🍦 Ice Cream", img: IceCreamImg },
  { name: "🥤 Soft Drink", img: SoftDrinkImg },
];

// Framer Motion animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.8 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const MenuPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-dark text-gray-700 px-4 sm:px-6 py-4 sm:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page Title */}
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold text-center text-primary mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🍽️ Our Menu
      </motion.h1>
      
      {/* Menu Items Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
      >
        {menuItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="relative bg-glass backdrop-blur-lg rounded-lg p-4 sm:p-6 shadow-lg w-full"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <img 
              src={item.img} 
              alt={item.name} 
              className="w-full h-40 sm:h-48 object-contain rounded-lg"
            />
            <h2 className="text-xl sm:text-2xl font-semibold mt-3 sm:mt-4 text-center">
              {item.name}
            </h2>
          </motion.div>
        ))}
      </motion.div>

      {/* Back Button */}
      <motion.div 
        className="mt-10 sm:mt-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link to="/">
          <Button className="bg-red-600 hover:bg-red-500">🏠 Back to Home</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MenuPage;
