/**
 * Main Application Component
 * 
 * This file manages routing and authentication for the task management application
 * Each route is protected based on user authentication status
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import BrowseTasks from './pages/BrowseTasks';
import MyPostedTasks from './pages/MyPostedTasks';
import TaskDetails from './pages/TaskDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdateTask from './pages/UpdateTask';
import NotFound from './pages/NotFound';

/**
 * PrivateRoute Component
 * 
 * Protects routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const PrivateRoute = ({ children }) => {
  // State to track current user and loading status
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up authentication listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Clean up authentication listener on component unmount
    return () => unsubscribe();
  }, []);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authenticated, show protected content, otherwise redirect to login
  return user ? children : <Navigate to="/login" />;
};

/**
 * App Component
 * 
 * Main application component that sets up routing and layout
 */
function App() {
  // Set default theme on app initialization
  useEffect(() => {
    document.documentElement.className = 'light';
  }, []);

  return (
    <Router>
      {/* Main application layout */}
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navigation bar */}
        <Navbar />
        
        {/* Main content area */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/browse-tasks" element={<BrowseTasks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route 
              path="/add-task" 
              element={
                <PrivateRoute>
                  <AddTask />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-posted-tasks" 
              element={
                <PrivateRoute>
                  <MyPostedTasks />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/task/:id" 
              element={
                <PrivateRoute>
                  <TaskDetails />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/update-task/:id" 
              element={
                <PrivateRoute>
                  <UpdateTask />
                </PrivateRoute>
              } 
            />
            
            {/* 404 Route - Matches any unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Toast notifications container */}
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;