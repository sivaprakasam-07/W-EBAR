import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import AboutUs from "./pages/AboutUsPage";
import Navbar from "./components/Navbar"; 
import Login from "./pages/Login";

const App = () => {
    return (
        <Router>
            <div className="bg-dark min-h-screen text-white">
                <Navbar /> {/* Navbar remains visible on all pages */}
                <div className="pt-16"> {/* Adds padding so content doesn't hide behind navbar */}
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
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
