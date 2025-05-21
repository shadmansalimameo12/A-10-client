/**
 * Home Component
 * 
 * This is the main landing page for TaskMarket application.
 * It displays featured tasks, why choose us section, and testimonials.
 */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import TaskCard from '../components/TaskCard';
import { Reveal } from 'react-awesome-reveal';

// Import icons
import { 
  FaSun, 
  FaMoon, 
  FaTasks, 
  FaUsers, 
  FaStar 
} from 'react-icons/fa';

const Home = () => {
  // ===== STATE MANAGEMENT =====
  const [tasks, setTasks] = useState([]);        // Store tasks from API
  const [loading, setLoading] = useState(true);  // Track loading state
  const [theme, setTheme] = useState('light');   // Track current theme

  // ===== DATA FETCHING =====
  useEffect(() => {
    // Function to fetch latest tasks
    const fetchTasks = async () => {
      try {
        // Get the 6 nearest deadline tasks
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks?limit=6&sort=deadline`
        );
        
        // Update state with fetched tasks
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    // Call the fetch function when component mounts
    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  // ===== EVENT HANDLERS =====
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  // ===== FEATURE SECTIONS DATA =====
  // Content for "Why Choose Us" section
  const features = [
    {
      icon: <FaTasks className="text-3xl text-primary mb-2" />,
      title: "Easy Task Management",
      description: "Post tasks in minutes and track their progress with our intuitive interface."
    },
    {
      icon: <FaUsers className="text-3xl text-primary mb-2" />,
      title: "Skilled Freelancers",
      description: "Access a large pool of verified professionals across various categories."
    },
    {
      icon: <FaStar className="text-3xl text-primary mb-2" />,
      title: "Quality Work",
      description: "Our rating system ensures you get only the best talent for your projects."
    },
  ];

  // ===== COMPONENT RENDERING =====
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900">
      {/* Hero Slider Section */}
      <Slider />
      
      <div className="container mx-auto p-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-primary btn-sm mb-6 flex items-center"
        >
          {theme === 'light' ? (
            <>
              <FaMoon className="mr-2" /> 
              Switch to Dark Mode
            </>
          ) : (
            <>
              <FaSun className="mr-2" /> 
              Switch to Light Mode
            </>
          )}
        </button>
        
        {/* Featured Tasks Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 flex items-center">
            <FaTasks className="mr-2 text-primary" /> 
            Featured Tasks
          </h2>
          
          {/* Conditional rendering based on loading state */}
          {loading ? (
            /* Loading spinner */
            <div className="flex justify-center items-center py-12">
              <div className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
              <span className="ml-2 text-lg">Loading tasks...</span>
            </div>
          ) : (
            /* Task cards grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </section>
        
        {/* Why Choose Us Section with Animation */}
        <Reveal>
          <section className="mb-12">
            <div className="bg-base-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-8">
                Why Choose TaskMarket?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Map through features array to create cards */}
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center p-4 border rounded-lg
                             hover:border-primary hover:shadow-md transition-all"
                  >
                    {feature.icon}
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
        
        {/* Testimonials Section with Animation */}
        <Reveal>
          <section>
            <div className="bg-base-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                What Our Users Say
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Testimonial 1 */}
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <p className="italic mb-4">
                    "TaskMarket helped me find the perfect developer for my website project. 
                    The process was smooth and the results exceeded my expectations!"
                  </p>
                  <div className="font-semibold">- Sarah Johnson, Small Business Owner</div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <p className="italic mb-4">
                    "As a freelancer, I've found consistent work through TaskMarket. 
                    The platform is intuitive and payment processing is always on time."
                  </p>
                  <div className="font-semibold">- Michael Lee, Web Developer</div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
};

export default Home;