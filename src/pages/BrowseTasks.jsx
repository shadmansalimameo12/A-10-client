<<<<<<< HEAD
// Browse Tasks page with bid count sorting
=======
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import { toast } from 'react-toastify';
=======
import TaskCard from '../components/TaskCard';
import { FaSearchDollar } from 'react-icons/fa';
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [sortBy, setSortBy] = useState('deadline'); // Default sort by deadline
  const navigate = useNavigate();

  // Tasks fetch korsi with sorting option
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://server-ten-virid-49.vercel.app/api/tasks?sort=${sortBy}`
        );
        setTasks(response.data);
      } catch (error) {
        toast.error('Tasks load korte problem holo!');
=======

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error("Failed to load tasks. Please try refreshing the page.");
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
<<<<<<< HEAD
  }, [sortBy]);

  // Task click korle details page e jabo
  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Browse Tasks</h2>
        <div className="mb-4">
          <label className="mr-2 text-gray-900 dark:text-gray-200">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="deadline">Deadline</option>
            <option value="bidsCount">Highest Bids</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer"
              onClick={() => handleTaskClick(task._id)}
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">{task.title}</h2>
              <p className="text-gray-900 dark:text-gray-200">Category: {task.category}</p>
              <p className="text-gray-900 dark:text-gray-200">Budget: ${task.budget}</p>
              <p className="text-gray-900 dark:text-gray-200">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
              <p className="text-gray-900 dark:text-gray-200">{task.description.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
=======
  }, []);

  if (loading) { // [cite: 39]
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <span className="loading loading-lg loading-spinner text-primary mb-4"></span>
        <p className="text-xl text-gray-600 dark:text-gray-300">Fetching available tasks...</p>
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      </div>
    );
  }

  return (
    <div className="bg-base-200 dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white flex items-center justify-center">
        <FaSearchDollar className="mr-3 text-primary" /> Browse All Available Tasks
      </h2>
      
      {tasks.length > 0 ? ( // [cite: 22]
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} /> // [cite: 23]
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaTasks className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">No tasks found at the moment.</p>
          <p className="text-gray-500 dark:text-gray-500">Why not be the first to post one?</p>
          <Link to="/add-task" className="btn btn-primary mt-6">Post a New Task</Link>
        </div>
      )}
    </div>
  );
};

export default BrowseTasks;