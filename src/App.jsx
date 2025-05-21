import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import AddTask from './pages/AddTask';
import BrowseTasks from './pages/BrowseTasks';
import MyPostedTasks from './pages/MyPostedTasks';
import TaskDetails from './pages/TaskDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdateTask from './pages/UpdateTask';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 dark:bg-gray-900 text-base-content dark:text-gray-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    // Attempt to read stored theme or default to light
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);
    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse-tasks" element={<BrowseTasks />} />
          <Route 
            path="/add-task"
            element={<PrivateRoute><AddTask /></PrivateRoute>}
          />
          <Route
            path="/my-posted-tasks"
            element={<PrivateRoute><MyPostedTasks /></PrivateRoute>}
          />
          <Route
            path="/task/:id"
            element={<PrivateRoute><TaskDetails /></PrivateRoute>}
          />
          <Route
            path="/update-task/:id"
            element={<PrivateRoute><UpdateTask /></PrivateRoute>}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" newestOnTop />
    </Router>
  );
}

export default App;