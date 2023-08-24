import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from "./Cart";
import Bill from "./Bill";
// import { useLocation } from "react-router-dom";


function App() {
  // const location = useLocation();
  // const { cart, total } = location.state || {};
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/bill" element={<Bill />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 