// Task details page with bids count
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';
<<<<<<< HEAD
import { FaInfoCircle, FaSpinner } from 'react-icons/fa';
=======
import { FaCalendarAlt, FaTags, FaDollarSign, FaUser, FaInfoCircle, FaGavel, FaExclamationCircle } from 'react-icons/fa';
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [bidsCount, setBidsCount] = useState(0); // [cite: 41]
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
  const [isBidding, setIsBidding] = useState(false);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c

  // Task ar bids count fetch korsi
  useEffect(() => {
<<<<<<< HEAD
    const fetchTask = async () => {
      try {
        const taskResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}`);
        const bidsResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}/bids-count`);
        setTask(taskResponse.data);
        // Extract bidsCount from response
        const count = typeof bidsResponse.data === 'object' && bidsResponse.data.message
          ? parseInt(bidsResponse.data.message.match(/\d+/)[0]) || 0
          : 0;
        setBidsCount(count);
      } catch (error) {
        toast.error('Task load korte problem holo!');
        if (error.response?.status === 404) {
          navigate('/not-found');
        }
=======
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`); // [cite: 28]
        setTask(response.data);
        setBidsCount(response.data.bidsCount || 0); // [cite: 41]
      } catch (error) {
        console.error("Error fetching task details:", error);
        toast.error("Could not load task details. It might have been removed.");
        navigate('/browse-tasks');
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
    fetchTask();
  }, [id, navigate]);

  // Bid place korsi ar updated count fetch korsi
  const handleBid = async () => {
    try {
      await axios.post('https://server-ten-virid-49.vercel.app/api/bids', {
        taskId: id,
        userEmail: auth.currentUser.email,
      });
      const bidsResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}/bids-count`);
      const count = typeof bidsResponse.data === 'object' && bidsResponse.data.message
        ? parseInt(bidsResponse.data.message.match(/\d+/)[0]) || 0
        : 0;
      setBidsCount(count);
      toast.success('Bid place hoye gese!');
    } catch (error) {
      toast.error('Bid place korte problem holo!');
=======
    fetchTaskDetails();
  }, [id, navigate]);

  const handleBid = async () => { // [cite: 40]
    if (!currentUser) {
        toast.error("Please log in to place a bid.");
        navigate("/login", { state: { from: location } });
        return;
    }
    if (currentUser.email === task?.userEmail) {
        toast.warn("You cannot bid on your own task.");
        return;
    }
    setIsBidding(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bids`, { 
        taskId: id, 
        userEmail: currentUser.email,
        bidderName: currentUser.displayName || "Anonymous Bidder",
        bidderPhotoURL: currentUser.photoURL || ""
      });
      setBidsCount(prevCount => prevCount + 1);
      toast.success('Bid placed successfully! The task owner has been notified.');
    } catch (error) {
      console.error("Error placing bid:", error);
      if (error.response && error.response.status === 409) {
         toast.warn('You have already placed a bid on this task.');
      } else {
         toast.error('Failed to place bid. Please try again.');
      }
    } finally {
      setIsBidding(false);
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
    }
  };
  
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
=======
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <span className="loading loading-lg loading-spinner text-primary mb-4"></span>
        <p className="text-xl text-gray-600 dark:text-gray-300">Loading task details...</p>
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      </div>
    );
  }

  if (!task) {
<<<<<<< HEAD
    return null;
  }

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Task Details</h2>
        <p className="mb-4 text-gray-900 dark:text-gray-200">You bid for {bidsCount} opportunities.</p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">{task.title}</h3>
          <p className="text-gray-900 dark:text-gray-200">Category: {task.category}</p>
          <p className="text-gray-900 dark:text-gray-200">Description: {task.description}</p>
          <p className="text-gray-900 dark:text-gray-200">
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </p>
          <p className="text-gray-900 dark:text-gray-200">Budget: ${task.budget}</p>
          <p className="text-gray-900 dark:text-gray-200">Posted by: {task.userName} ({task.userEmail})</p>
          <button
            onClick={handleBid}
            className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded mt-2"
          >
            <FaInfoCircle className="inline mr-1" /> Place Bid
          </button>
=======
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
        <FaExclamationCircle className="text-6xl text-error mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Task Not Found</h2>
        <p className="text-lg mb-8">The task you are looking for does not exist or may have been removed.</p>
        <Link to="/browse-tasks" className="btn btn-primary">Browse Other Tasks</Link>
      </div>
    );
  }

  const canBid = currentUser && currentUser.email !== task.userEmail;

  return (
    <div className="bg-base-200 dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
        <div className="max-w-3xl mx-auto">
            <div className="bg-base-100 dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold mb-2 text-primary">{task.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Posted by: {task.userName} ({task.userEmail})</p>

                <div className="mb-6 p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">
                        This task has <span className="text-2xl">{bidsCount}</span> active bid(s). {/* [cite: 41] */}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-start space-x-3">
                        <FaTags className="text-xl text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Category</h4>
                            <p className="text-gray-600 dark:text-gray-300">{task.category}</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <FaCalendarAlt className="text-xl text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Deadline</h4>
                            <p className="text-gray-600 dark:text-gray-300">{formatDate(task.deadline)}</p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-3">
                        <FaDollarSign className="text-xl text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Budget</h4>
                            <p className="text-gray-600 dark:text-gray-300">${task.budget}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                        <FaInfoCircle className="text-xl text-primary mr-2"/> Description
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap p-4 bg-base-200 dark:bg-gray-700 rounded-md">{task.description}</p>
                </div>
                
                {canBid && (
                    <div className="card-actions justify-center">
                        <button
                            onClick={handleBid}
                            className="btn btn-lg btn-primary hover:bg-primary-focus transition-colors"
                            disabled={isBidding}
                        >
                            {isBidding ? <span className="loading loading-spinner"></span> : <FaGavel />}
                            Place Your Bid
                        </button>
                    </div>
                )}
                 {!currentUser && (
                    <div className="text-center p-4 border-t border-base-300 dark:border-gray-700 mt-6">
                        <p className="mb-2 text-gray-600 dark:text-gray-400">Interested in this task?</p>
                        <Link to="/login" state={{ from: location }} className="btn btn-primary">Login to Place a Bid</Link>
                    </div>
                )}
                {currentUser && currentUser.email === task.userEmail && (
                     <div className="text-center p-4 border-t border-base-300 dark:border-gray-700 mt-6">
                        <p className="text-info">This is one of your posted tasks. You can manage bids or update it from "My Posted Tasks".</p>
                        <Link to="/my-posted-tasks" className="btn btn-sm btn-outline btn-info mt-2">Manage My Tasks</Link>
                    </div>
                )}
            </div>
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
        </div>
    </div>
  );
};

export default TaskDetails;