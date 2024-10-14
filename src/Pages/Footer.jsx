import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#07113a] text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Logo and Subscribe Section */}
        <div className="col-span-1 md:col-span-2">
          <p className="text-white  font-semibold mb-4 flex items-center">
            <img src="/images/logo-white.svg" alt="Logo" className="h-12 " />
          </p>
          <p className="mb-4">
            Subscribe to our newsletter to receive our weekly feed.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Your e-mail"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              <AiOutlineSend className="text-xl" />
            </button>
          </form>
        </div>

        {/* Discover Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Discover</h2>
          <ul>
            <li className="mb-2">
              <Link to="/miami" className="hover:text-white">
                Miami
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/new-york" className="hover:text-white">
                New York
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/chicago" className="hover:text-white">
                Chicago
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/sacramento" className="hover:text-white">
                Sacramento
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/los-angeles" className="hover:text-white">
                Los Angeles
              </Link>
            </li>
            <li>
              <Link to="/san-francisco" className="hover:text-white">
                San Francisco
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/pricing" className="hover:text-white">
                Pricing Plans
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">prakashkush0099@gmail.com</p>
          <p>(+91)7651895993</p>
        </div>

        {/* Our Address Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Our Address</h2>
          <p>Fifth Avenue, 3rd Floor</p>
          <p>Noida, Uttar Pradesh</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Links */}
        <div className="mb-4 md:mb-0 flex items-center">
          <span className="text-white font-semibold mr-4">Follow Us</span>
          <a href="#" className="hover:text-gray-400 mx-2">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-400 mx-2">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-400 mx-2">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400 mx-2">
            <FaLinkedin />
          </a>
        </div>

        {/* App Store Links */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="bg-gray-800 p-2 rounded-md flex items-center justify-center hover:bg-gray-700 transition"
          >
            <FaApple className="h-6 w-6 mr-2" />
            <span className="text-gray-400">
              Download on the <br />{" "}
              <span className="text-white">Apple Store</span>
            </span>
          </a>
          <a
            href="#"
            className="bg-gray-800 p-2 rounded-md flex items-center justify-center hover:bg-gray-700 transition"
          >
            <FaGooglePlay className="h-6 w-6 mr-2" />
            <span className="text-gray-400">
              Get it on <br /> <span className="text-white">Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
