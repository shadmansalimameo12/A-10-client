<<<<<<< HEAD
// Login page
=======
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
<<<<<<< HEAD
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
=======
import { FaEnvelope, FaLock, FaGoogle, FaSignInAlt } from 'react-icons/fa';
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const navigate = useNavigate();

  // Email login handle korsi
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Login korte problem holo!');
    }
  };

  // Google login handle korsi
=======
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

>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
<<<<<<< HEAD
      toast.success('Google diye login hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Google login korte problem holo!');
=======
      toast.success('Logged in with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message.replace('Firebase: ', '').replace(/\(auth.*?\)\.?/, '').trim() || 'Google login failed.');
    } finally {
      setIsLoading(false);
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
    }
  };

  return (
<<<<<<< HEAD
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <div className="flex items-center">
              <FaLock className="mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            <FaEnvelope className="inline mr-1" /> Login
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-2 rounded w-full mt-2">
          <FaGoogle className="inline mr-1" /> Login with Google
        </button>
        <p className="text-center mt-2">
          No account? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
=======
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
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      </div>
    </div>
  );
};

export default Login;