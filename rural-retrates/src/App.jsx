// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services ";
import HomeStays from "./components/Homestays";
import FAQs from "./components/FAQ1";
import Contact from "./components/Contact ";
import Login from "./components/Login ";
import Footer from "./components/Footer";
import FAQ1 from "./components/FAQ1"


function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/homestays" element={<HomeStays />} />
          <Route path="/faq" element={<FAQ1/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
