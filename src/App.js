// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReceiptPage from './ReceiptPage';
import ReceiptHistory from './ReceiptHistory'; // 👈 Import the new component
import HomePage from './HomePage'; // optional if you have a homepage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* 👈 Home page route */}
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/history" element={<ReceiptHistory />} /> {/* 👈 Receipt history page */}
      </Routes>
    </Router>
  );
};

export default App;
