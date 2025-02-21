import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

const DailyAnalysis = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orders"));
                const allOrders = [];
                let totalItems = 0;
                let itemCounts = {};

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    data.items.forEach((item) => {
                        itemCounts[item] = (itemCounts[item] || 0) + 1;
                        totalItems++; // Counting total items ordered
                    });
                });

                // Convert counts to percentages
                const chartData = Object.keys(itemCounts).map((item) => ({
                    name: item,
                    percentage: ((itemCounts[item] / totalItems) * 100).toFixed(2), // Percentage calculation
                }));

                setOrderData(chartData);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch order data!");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Customer Order Analysis</h1>
            
            {orderData.length > 0 ? (
                <ResponsiveContainer width="80%" height={400}>
                    <BarChart data={orderData}>
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percentage" fill="#4CAF50" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-lg">No orders placed yet.</p>
            )}
        </div>
    );
};

export default DailyAnalysis;
