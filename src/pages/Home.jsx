import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import TaskCard from '../components/TaskCard';
import { Reveal } from 'react-awesome-reveal';
import { FaSun, FaMoon, FaTasks, FaUsers, FaStar, FaThumbsUp, FaBullseye, FaShieldAlt, FaComments } from 'react-icons/fa';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks?limit=6&sort=deadline` // [cite: 11]
        );
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
        toast.error("Could not load featured tasks.");
      }
    };
    fetchTasks();
  }, []);

  const handleToggleTheme = () => { // [cite: 42]
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
     if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  };
  
  const whyChooseUsFeatures = [
    {
      icon: <FaBullseye className="text-4xl text-primary mb-3" />,
      title: "Targeted Matches",
      description: "Our smart system connects you with the right talent or tasks based on your specific needs and skills."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary mb-3" />,
      title: "Secure Platform",
      description: "We prioritize your security with safe payments and data protection for a worry-free experience."
    },
    {
      icon: <FaThumbsUp className="text-4xl text-primary mb-3" />,
      title: "Quality Guaranteed",
      description: "User reviews and a robust vetting process ensure high-quality outcomes for every project."
    },
  ];

  const testimonials = [
    {
      quote: "TaskMarket made finding a skilled graphic designer for my startup's logo incredibly easy and affordable. Highly recommended!",
      name: "Alex P.",
      role: "Startup Founder"
    },
    {
      quote: "As a freelance writer, TaskMarket has become my primary source for interesting projects and reliable clients. The platform is a game-changer.",
      name: "Maria S.",
      role: "Content Creator"
    }
  ];


  return (
    <div className="space-y-12">
      <div className="flex justify-end mb-2 sticky top-24 z-30 pr-2">
         <button
            onClick={handleToggleTheme}
            className="btn btn-circle btn-ghost btn-sm shadow-md bg-base-100 dark:bg-gray-700"
            aria-label="Toggle theme"
          >
            {currentTheme === 'light' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
          </button>
      </div>
      
      <Slider />

      <section className="py-8">
        <Reveal>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white flex items-center justify-center">
            <FaTasks className="mr-3 text-primary" /> Featured Tasks
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-lg loading-spinner text-primary"></span>
            </div>
          ) : tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">No featured tasks available right now. Check back soon!</p>
          )}
        </Reveal>
      </section>
      
      <Reveal> 
        <section className="py-12 bg-base-100 dark:bg-gray-800 rounded-xl shadow-lg"> {/* [cite: 13] */}
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Why Choose TaskMarket?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUsFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-base-200 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-12"> {/* [cite: 13] */}
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
              <FaComments className="inline mr-3 text-primary" /> What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-base-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <p className="text-gray-600 dark:text-gray-300 italic text-md mb-4">"{testimonial.quote}"</p>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-white">- {testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Home;