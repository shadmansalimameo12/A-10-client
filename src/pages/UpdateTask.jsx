import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';

const UpdateTask = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    budget: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
      .then((res) => {
        setFormData({
          title: res.data.title,
          category: res.data.category,
          description: res.data.description,
          deadline: res.data.deadline.split('T')[0],
          budget: res.data.budget,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/not-found');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, formData);
      toast.success('Task updated successfully!');
      navigate('/my-posted-tasks');
    } catch (error) {
      toast.error('Failed to update task!');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Task</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
          </select>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
            required
          />
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full p-2 mb-4 border rounded bg-gray-200 dark:bg-gray-600"
          />
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="w-full p-2 mb-4 border rounded bg-gray-200 dark:bg-gray-600"
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;