import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ding = new Audio("/ding.mp3");

const ViewOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("pending");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
            const ordersData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersData);
        });
        return () => unsubscribe();
    }, []);

    const markAsCompleted = async (orderId) => {
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: "completed" });
            toast.success("✅ Order marked as completed!", {
                style: {
                    background: "#1e293b",
                    color: "#22c55e",
                    border: "1px solid #22c55e",
                },
            });
            ding.play();
            if (navigator.vibrate) navigator.vibrate(200);
        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };

    const cancelOrder = async (orderId) => {
        const confirmed = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmed) return;

        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: "cancelled" });
            toast.success("❌ Order cancelled.", {
                style: {
                    background: "#1e293b",
                    color: "#f87171",
                    border: "1px solid #f87171",
                },
            });
        } catch (error) {
            toast.error("Error cancelling order.");
        }
    };

    const reopenOrder = async (orderId) => {
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: "pending" });
            toast.success("🔁 Order reopened.");
        } catch (error) {
            toast.error("Error reopening order.");
        }
    };

    const getItemCounts = (items) => {
        const count = {};
        items.forEach((item) => {
            count[item] = (count[item] || 0) + 1;
        });
        return count;
    };

    const getTimeAgo = (timestamp) => {
        if (!timestamp?.seconds) return "Unknown";
        const now = new Date();
        const orderTime = new Date(timestamp.seconds * 1000);
        const diffMs = now - orderTime;
        const minutes = Math.floor(diffMs / 60000);
        return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    };

    const filteredOrders = orders.filter((order) =>
        activeTab === "pending"
            ? order.status !== "completed" && order.status !== "cancelled"
            : order.status === "completed"
    );

    return (
        <div className="h-screen bg-gray-900 text-white p-4 sm:p-6 flex flex-col">
            <motion.h1
                className="text-3xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🍽️ Kitchen Orders Dashboard
            </motion.h1>

            {/* Tabs */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-4 py-2 mx-2 rounded-full ${
                        activeTab === "pending"
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-700 hover:bg-gray-600"
                    }`}
                >
                    Pending Orders
                </button>
                <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-4 py-2 mx-2 rounded-full ${
                        activeTab === "completed"
                            ? "bg-green-500 text-black"
                            : "bg-gray-700 hover:bg-gray-600"
                    }`}
                >
                    Completed Orders
                </button>
            </div>

            {/* Scrollable Orders Area */}
            <div className="flex-1 overflow-y-auto pb-4">
                {filteredOrders.length === 0 ? (
                    <p className="text-center text-gray-400 mt-10">
                        No {activeTab} orders.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredOrders.map((order) => {
                            const itemCounts = getItemCounts(order.items || []);
                            return (
                                <motion.div
                                    key={order.id}
                                    className="bg-gray-800 p-4 rounded-xl shadow-md border-l-4 border-yellow-500 overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-lg md:text-xl font-semibold mb-1 break-words">
                                        👤 {order.name}
                                    </h2>
                                    <div className="text-gray-300 mb-2">
                                        🧾 <strong>Items:</strong>
                                        <ul className="ml-4 list-disc text-sm max-h-32 overflow-y-auto pr-2">
                                            {Object.entries(itemCounts).map(([item, count]) => (
                                                <li key={item} className="break-words">
                                                    {item} x{count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="text-sm text-yellow-400 mb-1">
                                        ⏱️ {getTimeAgo(order.timestamp)}
                                    </p>
                                    <p
                                        className={`text-sm mb-3 font-medium ${
                                            order.status === "completed"
                                                ? "text-green-400"
                                                : order.status === "cancelled"
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                        }`}
                                    >
                                        Status: {order.status || "pending"}
                                    </p>

                                    {/* Action Buttons */}
                                    {order.status !== "completed" && order.status !== "cancelled" && (
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => markAsCompleted(order.id)}
                                                className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                                            >
                                                ✅ Complete
                                            </button>
                                            <button
                                                onClick={() => cancelOrder(order.id)}
                                                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                                            >
                                                ❌ Cancel
                                            </button>
                                        </div>
                                    )}

                                    {order.status === "completed" && (
                                        <button
                                            onClick={() => reopenOrder(order.id)}
                                            className="mt-2 px-4 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 text-sm"
                                        >
                                            🔁 Reopen
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewOrdersPage;
