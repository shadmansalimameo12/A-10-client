import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [bidsCount, setBidsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
      .then((res) => {
        setTask(res.data);
        setBidsCount(res.data.bidsCount || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/not-found');
      });
  }, [id, navigate]);

  const handleBid = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bids`, { taskId: id, userEmail: auth.currentUser.email });
      setBidsCount(bidsCount + 1);
      toast.success('Bid placed successfully!');
    } catch (error) {
      toast.error('Failed to place bid!');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!task) return null;

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Task Details</h2>
        <p>You bid for {bidsCount} opportunities.</p>
        <div className="border rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>Category: {task.category}</p>
          <p>Description: {task.description}</p>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p>Budget: ${task.budget}</p>
          <p>Posted by: {task.userName} ({task.userEmail})</p>
          <button
            onClick={handleBid}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;