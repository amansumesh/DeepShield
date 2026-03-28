import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import InteractiveDots from "./components/InteractiveDots";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen text-white selection:bg-blue-500/30">

        {/* ✨ Premium Aesthetic Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          
          {/* Subtle Dynamic Gradients */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-aurora"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[130px] rounded-full animate-aurora [animation-delay:-7s]"></div>
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-violet-600/10 blur-[110px] rounded-full animate-aurora [animation-delay:-15s]"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[25%] h-[25%] bg-cyan-500/5 blur-[90px] rounded-full animate-aurora [animation-delay:-20s]"></div>

          {/* Particle System */}
          <InteractiveDots />
        </div>


        {/* App Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>

      </div>
    </Router>
  );
}

export default App;