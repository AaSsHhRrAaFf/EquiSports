
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="footer p-10 max-w-7xl mx-auto">
        {/* Brand and About */}
        <div>
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Sports Hub Logo" className="h-10 w-10" />
            <span className="text-xl font-bold ml-2">Sports Hub</span>
          </Link>
          <p className="max-w-xs mt-2">
            Your premier destination for quality sports equipment. 
            Empowering athletes with professional gear since 2023.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <span className="footer-title">Contact Us</span>
          <address className="not-italic">
            <p>123 Sports Avenue</p>
            <p>Dhaka, Bangladesh</p>
            <p>Phone: +880 1234-567890</p>
            <p>Email: info@sportshub.com</p>
          </address>
        </div>

        {/* Quick Links */}
        <div>
          <span className="footer-title">Quick Links</span>
          <Link to="/all-equipment" className="link link-hover">All Equipment</Link>
          <Link to="/about" className="link link-hover">About Us</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
          <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
        </div>

        {/* Social Links */}
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-primary transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-primary transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-primary transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-primary transition-colors">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © {currentYear} - All rights reserved by Sports Hub</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
