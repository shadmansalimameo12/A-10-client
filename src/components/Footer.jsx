/**
 * Footer Component
 * 
 * Displays at the bottom of every page.
 * Contains contact information, links, and social media icons.
 */
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin 
} from 'react-icons/fa';

const Footer = () => {
  // Social media links data
  const socialLinks = [
    { 
      icon: <FaFacebook />, 
      url: "https://facebook.com",
      label: "Facebook"
    },
    { 
      icon: <FaTwitter />, 
      url: "https://twitter.com",
      label: "Twitter"
    },
    { 
      icon: <FaLinkedin />, 
      url: "https://linkedin.com",
      label: "LinkedIn"
    }
  ];

  return (
    <footer className="bg-base-200 dark:bg-gray-900 text-base-content p-6 mt-8">
      <div className="container mx-auto text-center">
        {/* Contact Email */}
        <p className="text-sm mb-2">
          Contact: 
          <a 
            href="mailto:support@taskmarket.com" 
            className="link link-hover ml-1"
          >
            support@taskmarket.com
          </a>
        </p>

        {/* Terms & Conditions Link */}
        <p className="text-sm mb-4">
          <a 
            href="/terms" 
            className="link link-primary link-hover"
          >
            Terms & Conditions
          </a>
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              aria-label={social.label}
              className="text-2xl hover:text-primary transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;