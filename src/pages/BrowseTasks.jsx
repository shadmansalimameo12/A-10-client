import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import { FaSearchDollar } from 'react-icons/fa';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error("Failed to load tasks. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) { // [cite: 39]
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <span className="loading loading-lg loading-spinner text-primary mb-4"></span>
        <p className="text-xl text-gray-600 dark:text-gray-300">Fetching available tasks...</p>
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