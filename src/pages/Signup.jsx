import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle, FaUserPlus } from 'react-icons/fa';

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

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, photoURL, password } = formData;
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success('Account created successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Email signup error:', error);
      toast.error(error.message.replace('Firebase: ', '').replace(/\(auth.*?\)\.?/, '').trim() || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed up with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error(error.message.replace('Firebase: ', '').replace(/\(auth.*?\)\.?/, '').trim() || 'Google signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
      </div>
    </div>
  );
};

export default Signup;