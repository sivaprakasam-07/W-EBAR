import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
// import MenuPage from "./pages/MenuPage";
// import AboutUsPage from "./pages/AboutUsPage";
// import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Router>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/menu"
            element={<MenuPage setSelectedItem={setSelectedItem} />}
          />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </AnimatePresence>
      {selectedItem && <ARModelViewer item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </Router>
  );
}

export default App;
