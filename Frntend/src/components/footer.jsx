import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 text-black py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand Info */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Sam&apos;s Blog Site
          </h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Helping you manage your blogs wisely, track uploads, discover
            content, and stay productive.
          </p>
        </div>

        {/* Useful Links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl sm:text-2xl font-semibold mb-4">
            Useful Links
          </h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:underline transition-all">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline transition-all">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline transition-all">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline transition-all">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl sm:text-2xl font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link to="/about-me" className="hover:underline transition-all">
                About Me
              </Link>
            </li>
            <li>
              <Link to="/contact-me" className="hover:underline transition-all">
                Contact Me
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black/20 my-8"></div>

      {/* Social & Bottom */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center">
        <p className="text-sm sm:text-base">
          © 2025 Sam&apos;s Blog Site. All rights reserved.
        </p>

        <div className="flex justify-center gap-5">
          <a
            href="https://www.facebook.com/share/18UGY2swKN/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-xl sm:text-2xl text-black hover:text-blue-600 transition-colors">
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/mr_saamy?igsh=emhvNWQwZmtyNHEz&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-xl sm:text-2xl text-black hover:text-pink-600 transition-colors">
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammadsami01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-xl sm:text-2xl text-black hover:text-blue-800 transition-colors">
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/MuhammadSami643"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-xl sm:text-2xl text-black hover:text-gray-800 transition-colors">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
