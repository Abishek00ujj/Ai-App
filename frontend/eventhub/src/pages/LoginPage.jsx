import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode to decode the credential
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';
// Helper function to decode the Google credential JWT
const decodeGoogleCredential = (credentialResponse) => {

  // Decode the JWT token
  const decoded = jwtDecode(credentialResponse.credential);
  console.log('Decoded Google Credential:', decoded);
  return decoded; // Contains sub, email, name, picture, etc.
};


function LoginPage() {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleRedirect=()=>{
    setRedirect(true);
  
}

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle traditional email/password login logic here
    console.log('Traditional Login submitted:', { email, password });
    // Send this data to your backend
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const googleUser = decodeGoogleCredential(credentialResponse);
   
    console.log('Google Login Success:', googleUser);


  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
    // Handle error (e.g., show an error message to the user)
  };

  if(redirect){
    navigate('/dashboard1');
  }


  return (
    <>
    <Navbar/>
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In to EventHub</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleRedirect}
            >
              Log In with Email
            </button>
          </div>
        </form>

        <div className="text-center text-gray-600 mb-4">-- OR --</div>

        {/* Google Login Button */}
        <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              // You can customize the button appearance
              text="signin_with" // Changes the button text
              shape="rectangular"
              theme="filled_blue"
              size="large"
            />
        </div>

        {/* Optional: Link to signup page */}
        <p className="text-center mt-4">
          <a className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800" href="/signup">
            Don't have an account? Sign Up
          </a>
        </p>

      </div>
    </div>
    </>
   
  );
}

export default LoginPage;