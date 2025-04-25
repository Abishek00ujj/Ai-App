// In your index.js (or equivalent)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming your App component is in App.js
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the provider

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    {/* Wrap your App with GoogleOAuthProvider and provide your Client ID */}
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);