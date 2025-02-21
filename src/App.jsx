import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landingpage"; // Corrected import path
import MenuPage from "./pages/MenuPage";
import Aboutus from "./pages/AboutusPage"; // Corrected import path
import Navbar from "./components/Navbar"; // Corrected import path
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast"; // Import Toaster

const App = () => {
    return (
        <Router>
            <div className="bg-dark min-h-screen text-white">
                <Navbar /> {/* Navbar remains visible on all pages */}
                <Toaster /> {/* Add Toaster for toast notifications */}
                <div className="pt-16"> {/* Adds padding so content doesn't hide behind navbar */}
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login page */}
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
