/**
 * Login Component
 * 
 * Handles user authentication via email/password or Google sign-in.
 * Provides form validation and redirects on successful login.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import Firebase authentication methods
import { 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';

// Import icons
import { 
  FaEnvelope, 
  FaLock, 
  FaGoogle 
} from 'react-icons/fa';

const Login = () => {
  // ===== STATE MANAGEMENT =====
  const [email, setEmail] = useState('');       // Store email input
  const [password, setPassword] = useState(''); // Store password input
  const navigate = useNavigate();               // For navigation after login

  // ===== EVENT HANDLERS =====
  /**
   * Handle standard email/password login
   * @param {Event} e - Form submit event
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      // Attempt to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // Show success message
      toast.success('Logged in successfully!');
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      // Log error for debugging
      console.error('Email login error:', error.code, error.message);
      
      // Show error message to user
      toast.error(`Login failed: ${error.message}`);
    }
  };

  /**
   * Handle Google authentication login
   */
  const handleGoogleLogin = async () => {
    try {
      // Attempt to sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      
      // Log user info for debugging
      console.log('Google login user:', result.user);
      
      // Show success message
      toast.success('Logged in with Google!');
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      // Log error for debugging
      console.error('Google login error:', error.code, error.message);
      
      // Show error message to user
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  // ===== COMPONENT RENDERING =====
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="card w-full max-w-md bg-base-100 dark:bg-gray-800 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Login to TaskMarket</h2>
          
          {/* Email/Password Login Form */}
          <form onSubmit={handleLogin} className="form-control">
            {/* Email Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="input-group">
                <span className="input input-bordered">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-group">
                <span className="input input-bordered">
                  <FaLock />
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              <FaEnvelope className="mr-1" /> Login
            </button>
          </form>
          
          {/* Google Login Button */}
          <button 
            onClick={handleGoogleLogin} 
            className="btn btn-error w-full mt-4"
          >
            <FaGoogle className="mr-1" /> Login with Google
          </button>
          
          {/* Signup Link */}
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="link link-primary link-hover">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;