<<<<<<< HEAD
// Footer component
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p className="mb-2">
        Contact: <a href="mailto:support@taskmarket.com" className="text-blue-500">support@taskmarket.com</a>
      </p>
      <p className="mb-2">
        <a href="/terms" className="text-blue-500">Terms & Conditions</a>
      </p>
      <div className="flex justify-center gap-4">
        <a href="https://www.facebook.com/taskmarket" className="text-2xl">
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com/taskmarket" className="text-2xl">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/company/taskmarket" className="text-2xl">
          <FaLinkedin />
        </a>
=======
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaFileContract } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaLinkedin />, url: "https://linkedin.com", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-base-300 dark:bg-gray-800 text-base-content dark:text-gray-300 p-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <p className="text-lg font-semibold">TaskMarket</p>
          <p className="text-sm">Your go-to platform for freelance tasks.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center justify-center md:justify-end md:pr-4">
                <FaEnvelope className="mr-2" />
                <a href="mailto:support@taskmarket.com" className="link link-hover">
                    support@taskmarket.com
                </a>
            </div>
            <div className="flex items-center justify-center md:justify-start md:pl-4">
                <FaFileContract className="mr-2" />
                <a href="/terms" className="link link-hover">
                    Terms & Conditions
                </a>
            </div>
        </div>

        <div className="flex justify-center gap-6 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        <p className="text-xs">
          &copy; {new Date().getFullYear()} TaskMarket. All rights reserved.
        </p>
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
      </div>
    </footer>
  );
};

export default Footer;