import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode to decode the credential
import Navbar from '../components/Navbar'; // Import your Navbar component
// Helper function to decode the Google credential JWT
const decodeGoogleCredential = (credentialResponse) => {
  // Decode the JWT token
  const decoded = jwtDecode(credentialResponse.credential);
  console.log('Decoded Google Credential:', decoded);
  return decoded; // Contains sub, email, name, picture, etc.
};

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle traditional email/password signup logic here
    console.log('Traditional Signup submitted:', { email, password, role });
    // Send this data to your backend
  };

  const handleGoogleSignupSuccess = (credentialResponse) => {
    const googleUser = decodeGoogleCredential(credentialResponse);
    // This is where you send the `credentialResponse.credential` (the JWT)
    // or the decoded `googleUser` info to your backend server for verification and signup.
    console.log('Google Signup Success:', googleUser);

    // Example of what you might send to your backend:
    // fetch('/api/auth/google-signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     googleCredential: credentialResponse.credential,
    //     // You might want to allow the user to select a role even with Google signup,
    //     // or set a default role on the backend. For this example, let's assume default user role.
    //     // role: 'user' // Or allow user to choose before clicking Google button
    //   }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Backend response:', data);
    //   // Handle success (e.g., redirect to dashboard) or error
    // })
    // .catch(error => {
    //   console.error('Error sending Google credential to backend:', error);
    // });
  };

  const handleGoogleSignupError = () => {
    console.log('Google Signup Failed');
    // Handle error (e.g., show an error message to the user)
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up for EventHub</h2>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="coordinator">Coordinator</option>
            </select>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up with Email
            </button>
          </div>
        </form>

        <div className="text-center text-gray-600 mb-4">-- OR --</div>

        {/* Google Signup Button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSignupSuccess}
            onError={handleGoogleSignupError}
            // You can customize the button appearance with props like `type`, `theme`, `size`
            // See library documentation for more options: https://www.npmjs.com/package/@react-oauth/google
            text="signup_with" // Changes the button text
            shape="rectangular"
            theme="filled_blue"
            size="large"
          />
        </div>

        {/* Optional: Link back to login page */}
        <p className="text-center mt-4">
          <a className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800" href="/login">
            Already have an account? Log In
          </a>
        </p>
      </div>
    </div>
    </>
  );
}

export default SignupPage;