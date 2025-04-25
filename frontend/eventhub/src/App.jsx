// In your App.js or a dedicated routing file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Assuming your LandingPage is in this file
import SignupPage from './pages/SignupPage'; // Assuming your SignupPage is in this file
import LoginPage from './pages/LoginPage';     // Assuming your LoginPage is in this file

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<LandingPage />} />
        {/* Route for the signup page */}
        <Route path="/signup" element={<SignupPage />} />
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Add other routes for your application here */}
      </Routes>
    </Router>
  );
}

export default App;