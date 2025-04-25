// In your App.js or a dedicated routing file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Assuming your LandingPage is in this file
import SignupPage from './pages/SignupPage'; // Assuming your SignupPage is in this file
import LoginPage from './pages/LoginPage';     // Assuming your LoginPage is in this file
import OrganizerDashboard from './pages/OrganizerDashboard';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
     
        <Route path="/signup" element={<SignupPage />} />
      
        <Route path="/login" element={<LoginPage />} />

        <Route path='/dashboard1' element={<OrganizerDashboard/>} /> 


        <Route path='/dashboard2' element={<OrganizerDashboard/>} /> 
      </Routes>
    </Router>
  );
}

export default App;