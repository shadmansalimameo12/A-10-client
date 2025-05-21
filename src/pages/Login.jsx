import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { FaEnvelope, FaLock, FaGoogle, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Email login error:', error);
      toast.error(error.message.replace('Firebase: ', '').replace(/\(auth.*?\)\.?/, '').trim() || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message.replace('Firebase: ', '').replace(/\(auth.*?\)\.?/, '').trim() || 'Google login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl transform transition-all hover:scale-105">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome Back!
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-primary"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-primary"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : <FaSignInAlt />}
              Login
            </button>
          </form>
          
          <div className="divider my-6 text-gray-500">OR</div>
          
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full"
            disabled={isLoading}
          >
            {isLoading ? <span className="loading loading-spinner"></span> : <FaGoogle />}
            Continue with Google
          </button>
          
          <p className="text-center mt-6 text-sm text-gray-600">
            New to TaskMarket?{' '}
            <Link to="/signup" className="link link-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;