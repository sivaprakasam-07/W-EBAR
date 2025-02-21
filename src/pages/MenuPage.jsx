import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// Import images
import BurgerImg from '../assets/burger.jpg';
import PizzaImg from '../assets/Pizza.jpg';
import FriesImg from '../assets/FRENCH FRIES.jpg';
import ChickenImg from '../assets/chicken.jpg';
import IceCreamImg from '../assets/Ice cream.jpg';
import SoftDrinkImg from '../assets/cooldrinks.jpg';

// Define menu items
const menuItems = [
  { name: '🍔 Burger', img: BurgerImg },
  { name: '🍕 Pizza', img: PizzaImg },
  { name: '🍟 Fries', img: FriesImg },
  { name: '🍗 Chicken', img: ChickenImg },
  { name: '🍦 Ice Cream', img: IceCreamImg },
  { name: '🥤 Soft Drink', img: SoftDrinkImg },
];

// Framer Motion animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.8 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

// Function to show the model
const showModel = (modelId) => {
  const models = ['burger', 'pizza', 'fries', 'softdrink', 'chicken', 'icecream', 'combo'];
  models.forEach(id => {
    const model = document.getElementById(id);
    if (model) {
      model.setAttribute('visible', id === modelId);
    }
  });
};

// AR Scene component (embedded HTML structure with A-Frame)
const ARScene = () => {
  useEffect(() => {
    // Ensure the showModel function is available
    window.showModel = showModel;

    // Ask for device orientation permissions
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            console.log('Device orientation permission granted');
          } else {
            console.log('Device orientation permission denied');
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <a-scene
        mindar-image="imageTargetSrc: target.mind; filterMinCF: 0.001; warmupTolerance: 5;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        embedded
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Image Target */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-entity
            id="burger"
            gltf-model="burger.glb"
            position="0 -0.06 0"
            scale="0.08 0.08 0.08"
            rotation="90 0 0"
            visible="false"
          ></a-entity>
          <a-entity
            id="pizza"
            gltf-model="pizza.glb"
            position="0 -0.07 0"
            scale="0.15 0.15 0.15"
            rotation="90 0 0"
            visible="false"
          ></a-entity>
          <a-entity
            id="fries"
            gltf-model="fries.glb"
            position="0 -0.06 0"
            scale="0.12 0.12 0.12"
            rotation="90 0 0"
            visible="false"
          ></a-entity>
          <a-entity
            id="chicken"
            gltf-model="chicken.glb"
            position="0 -0.06 0"
            scale="0.5 0.5 0.5"
            rotation="90 0 0"
            visible="false"
          ></a-entity>
          <a-entity
            id="softdrink"
            gltf-model="cooldrink.glb"
            position="0 -0.06 0"
            scale="0.5 0.5 0.5"
            rotation="90 0 0"
            visible="false"
          ></a-entity>
          <a-entity
            id="combo"
            gltf-model="comba.glb"
            position="0 -0.06 0"
            scale="0.6 0.6 0.6"
            rotation="90 0 0"
            visible="false"
          ></a-entity>
          <a-entity
            id="icecream"
            gltf-model="icecream.glb"
            position="0 -0.06 0"
            scale="1 1 1"
            rotation="90 0 0"
            visible="false"
          ></a-entity> 
        </a-entity>
      </a-scene>
      <div style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px' }}>
        <button onClick={() => showModel('burger')}>🍔 Burger</button>
        <button onClick={() => showModel('pizza')}>🍕 Pizza</button>
        <button onClick={() => showModel('fries')}>🍟 Fries</button>
        <button onClick={() => showModel('chicken')}>🍗 Chicken</button>
        <button onClick={() => showModel('softdrink')}>🥤 Soft Drink</button>
        <button onClick={() => showModel('icecream')}>🍦 Ice Cream</button>
        <button onClick={() => showModel('combo')}>🍽 Combo</button>
      </div>
    </div>
  );
};

// Menu page component with AR overlay integration
const MenuPage = () => (
  <motion.div
    className="min-h-screen bg-dark text-gray-700 px-4 sm:px-6 py-4 sm:py-6"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    {/* AR Scene */}
    <ARScene />

    {/* Page Title */}
    <motion.h1 
      className="text-4xl sm:text-5xl font-bold text-center text-primary mb-6 sm:mb-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      🍽 Our Menu
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

export default MenuPage;