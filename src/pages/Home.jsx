<<<<<<< HEAD
// Home page with tasks, features, ar typewriter effect
=======
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Slider from '../components/Slider';
import TaskCard from '../components/TaskCard';
<<<<<<< HEAD
import { FaTasks, FaUsers, FaStar } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
=======
import { Reveal } from 'react-awesome-reveal';
import { FaSun, FaMoon, FaTasks, FaUsers, FaStar, FaThumbsUp, FaBullseye, FaShieldAlt, FaComments } from 'react-icons/fa';
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

  // Tasks fetch korsi (6 ta, deadline sort default)
=======
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
<<<<<<< HEAD
          'https://server-ten-virid-49.vercel.app/api/tasks?limit=6&sort=deadline'
=======
          `${import.meta.env.VITE_API_URL}/tasks?limit=6&sort=deadline` // [cite: 11]
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
        );
        setTasks(response.data);
      } catch (error) {
        toast.error('Tasks load korte problem holo!');
      } finally {
        setLoading(false);
        toast.error("Could not load featured tasks.");
      }
    };
    fetchTasks();
  }, []);

<<<<<<< HEAD
  // Features data
  const features = [
    { icon: <FaTasks />, title: "Easy Task Management", description: "Post and track tasks easily." },
    { icon: <FaUsers />, title: "Skilled Freelancers", description: "Find verified professionals." },
    { icon: <FaStar />, title: "Quality Work", description: "Get the best talent." },
  ];

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <Slider />
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">
          {/* Typewriter effect add korsi */}
          <Typewriter
            words={['Featured Tasks', 'Find Work', 'Post Jobs']}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
        {loading ? (
          <div className="text-center p-4 text-gray-900 dark:text-gray-200">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mx-auto"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-200">Why Choose TaskMarket?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-4 border rounded text-gray-900 dark:text-gray-200">
                {feature.icon}
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-200">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded text-gray-900 dark:text-gray-200">
              <p className="italic">"TaskMarket helped me find a great developer!"</p>
              <p className="font-bold">- Sarah, Business Owner</p>
            </div>
            <div className="p-4 border rounded text-gray-900 dark:text-gray-200">
              <p className="italic">"I found consistent work on TaskMarket."</p>
              <p className="font-bold">- Michael, Developer</p>
            </div>
          </div>
        </div>
      </div>
=======
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
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
    </div>
  );
};

export default Home;