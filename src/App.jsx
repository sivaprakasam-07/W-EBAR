import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // ✅ Ensure correct case
import MenuPage from "./pages/MenuPage";
import AboutusPage from "./pages/AboutusPage"; // ✅ Ensure correct case
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <Router>
            <div className="bg-dark min-h-screen text-white">
                <Navbar />
                <Toaster />
                <div className="pt-16">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/landing" element={<LandingPage />} /> {/* ✅ Fixed */}
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/about" element={<AboutusPage />} /> {/* ✅ Fixed */}
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
