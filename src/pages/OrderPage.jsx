// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { db } from "../firebaseConfig"; // Ensure this file exists & is configured correctly
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import toast from "react-hot-toast";

// const menuItems = ["Burger", "Pizza", "Fries", "Coke", "Ice Cream"];

// const OrderPage = () => {
//     const [name, setName] = useState("");
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Toggle item selection
//     const toggleItemSelection = (item) => {
//         setSelectedItems((prev) =>
//             prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
//         );
//     };

//     // Submit order to Firebase
//     const handleOrderSubmit = async () => {
//         if (!name.trim() || selectedItems.length === 0) {
//             toast.error("Please enter your name and select at least one item!");
//             return;
//         }

//         setLoading(true);

//         try {
//             const orderRef = collection(db, "orders"); // Firestore collection
//             await addDoc(orderRef, {
//                 name,
//                 items: selectedItems,
//                 timestamp: serverTimestamp() // Add timestamp
//             });

//             toast.success("Order placed successfully!");
//             setName(""); // Reset name input
//             setSelectedItems([]); // Reset selected items
//         } catch (error) {
//             console.error("Error placing order:", error);
//             toast.error("Failed to place order!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
//             <motion.h1 
//                 className="text-4xl font-bold mb-6"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 Place Your Order
//             </motion.h1>

//             {/* Name Input */}
//             <motion.input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full max-w-md p-3 mb-4 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//             />

//             {/* Menu Items */}
//             <motion.div 
//                 className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//             >
//                 {menuItems.map((item, index) => (
//                     <motion.button
//                         key={index}
//                         onClick={() => toggleItemSelection(item)}
//                         className={`p-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
//                             selectedItems.includes(item)
//                                 ? "bg-blue-500 text-white scale-105"
//                                 : "bg-gray-700 hover:bg-gray-600"
//                         }`}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         {item}
//                     </motion.button>
//                 ))}
//             </motion.div>

//             {/* Order Button */}
//             <motion.button
//                 onClick={handleOrderSubmit}
//                 className="mt-6 px-6 py-3 text-lg font-bold rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
//                 disabled={loading}
//                 whileTap={{ scale: 0.95 }}
//             >
//                 {loading ? "Placing Order..." : "Confirm Order"}
//             </motion.button>
//         </div>
//     );
// };

// export default OrderPage;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebaseConfig"; // Ensure this file exists & is configured correctly
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const menuItems = ["Burger", "Pizza", "Fries", "Coke", "Ice Cream"];

const OrderPage = () => {
    const [name, setName] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Toggle item selection
    const toggleItemSelection = (item) => {
        setSelectedItems((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    // Submit order to Firebase
    const handleOrderSubmit = async () => {
        if (!name.trim() || selectedItems.length === 0) {
            toast.error("Please enter your name and select at least one item!");
            return;
        }

        setLoading(true);

        try {
            console.log("Trying to place order..."); // Debugging line
            console.log("Firestore Connected: ", db); // Debugging Firestore connection
            
            const orderRef = collection(db, "orders"); // Firestore collection
            await addDoc(orderRef, {
                name,
                items: selectedItems,
                timestamp: serverTimestamp() // Add timestamp
            });

            toast.success("Order placed successfully!");
            console.log("Order successfully placed!"); // Debugging success case

            setName(""); // Reset name input
            setSelectedItems([]); // Reset selected items
        } catch (error) {
            console.error("🔥 Firestore Error:", error); // Debugging
            toast.error("Failed to place order! Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <motion.h1 
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Place Your Order
            </motion.h1>

            {/* Name Input */}
            <motion.input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-md p-3 mb-4 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Menu Items */}
            <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {menuItems.map((item, index) => (
                    <motion.button
                        key={index}
                        onClick={() => toggleItemSelection(item)}
                        className={`p-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
                            selectedItems.includes(item)
                                ? "bg-blue-500 text-white scale-105"
                                : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        {item}
                    </motion.button>
                ))}
            </motion.div>

            {/* Order Button */}
            <motion.button
                onClick={handleOrderSubmit}
                className="mt-6 px-6 py-3 text-lg font-bold rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
                disabled={loading}
                whileTap={{ scale: 0.95 }}
            >
                {loading ? "Placing Order..." : "Confirm Order"}
            </motion.button>
        </div>
    );
};

export default OrderPage;
