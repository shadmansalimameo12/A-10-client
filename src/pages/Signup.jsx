// Signup page
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { FaUser, FaEnvelope, FaLink, FaLock, FaGoogle } from 'react-icons/fa';
=======
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle, FaUserPlus } from 'react-icons/fa';
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => { // [cite: 15]
    if (password.length < 6) return 'Password must be at least 6 characters long.';
    if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter.';
    if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter.';
    return null; 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form input handle korsi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email signup handle korsi
  const handleSignup = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(formData.password)) {
      toast.error('Password e uppercase, lowercase, and 6+ chars lagbe!');
=======
    setIsLoading(true);
    const { name, email, photoURL, password } = formData;
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      setIsLoading(false);
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      return;
    }

    try {
<<<<<<< HEAD
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name, photoURL: formData.photoURL });
      toast.success('Signup hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Signup korte problem holo!');
=======
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success('Account created successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Email signup error:', error);
      toast.error(error.message.replace('Firebase: ', '').replace(/\(auth.*?\)\.?/, '').trim() || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
    }
  };

  // Google signup handle korsi
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
<<<<<<< HEAD
      toast.success('Google diye signup hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Google signup korte problem holo!');
=======
      toast.success('Signed up with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error(error.message.replace('Firebase: ', '').replace(/\(auth.*?\)\.?/, '').trim() || 'Google signup failed.');
    } finally {
      setIsLoading(false);
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
    }
  };

  return (
<<<<<<< HEAD
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Photo URL</label>
            <div className="flex items-center">
              <FaLink className="mr-2" />
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Enter your photo URL"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Signup
          </button>
        </form>
        <button onClick={handleGoogleSignup} className="bg-red-500 text-white p-2 rounded w-full mt-2">
          <FaGoogle className="inline mr-1" /> Signup with Google
        </button>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
=======
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl transform transition-all hover:scale-105">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center mb-6 text-gray-800">
            Join TaskMarket Today!
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            {[
              { name: 'name', type: 'text', placeholder: 'Full Name', icon: <FaUser /> },
              { name: 'email', type: 'email', placeholder: 'Email Address', icon: <FaEnvelope /> },
              { name: 'photoURL', type: 'url', placeholder: 'Photo URL (optional)', icon: <FaImage /> },
              { name: 'password', type: 'password', placeholder: 'Create Password', icon: <FaLock /> },
            ].map(field => (
              <div className="form-control" key={field.name}>
                <label className="label">
                  <span className="label-text text-gray-700">{field.placeholder}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{field.icon}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="input input-bordered w-full pl-10 focus:border-primary focus:ring-primary"
                    required={field.name !== 'photoURL'}
                    disabled={isLoading}
                  />
                </div>
                {field.name === 'password' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Min 6 chars, 1 uppercase, 1 lowercase.
                  </p>
                )}
              </div>
            ))}
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : <FaUserPlus />}
              Create Account
            </button>
          </form>

          <div className="divider my-6 text-gray-500">OR</div>

          <button
            onClick={handleGoogleSignup}
            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full"
            disabled={isLoading}
          >
             {isLoading ? <span className="loading loading-spinner"></span> : <FaGoogle />}
            Sign up with Google
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      </div>
    </div>
  );
};

export default Signup;