import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;
    if (!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password)) {
      toast.error('Password must have an uppercase, lowercase, and be at least 6 characters.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success('Signed up successfully!');
      navigate('/');
    } catch (error) {
      console.error('Email signup error:', error.code, error.message); // Debug: Log error details
      toast.error(`Signup failed: ${error.message}`);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google signup user:', result.user); // Debug: Log user object
      toast.success('Signed up with Google!');
      navigate('/');
    } catch (error) {
      console.error('Google signup error:', error.code, error.message); // Debug: Log error details
      toast.error(`Google signup failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white p-4 flex items-center justify-center">
      <div className="max-w-md w-full border p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <input
            type="url"
            placeholder="Photo URL"
            value={formData.photoURL}
            onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
            Signup
          </button>
        </form>
        <button
          onClick={handleGoogleSignup}
          className="w-full p-2 mt-4 bg-red-600 text-white rounded"
        >
          Signup with Google
        </button>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;