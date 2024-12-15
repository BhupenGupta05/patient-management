import React from 'react';

const Footer = () => {
  return (
    <footer className='flex flex-col md:flex-row justify-between bg-yellow-300 gap-8'>
        {/* ABOUT COMPANY */}
        <div className="flex flex-col flex-1 bg-red-300">
          <h2 className="text-md md:text-lg mb-2">NurtureMed</h2>
          <p className="text-xs md:text-sm">
            We are a company dedicated to providing top-notch services and solutions to our customers. Our mission is to innovate and inspire excellence in everything we do.
          </p>
        </div>

        {/* USEFUL LINKS */}
        <div className="flex flex-col flex-1 justify-center bg-violet-300 items-start">
          <h2 className="text-md md:text-lg mb-2">Company</h2>
          <ul className="space-y-2 text-xs md:text-sm">
            <li>
              <a href="#home" className="hover:text-indigo-600">Home</a>
            </li>
            <li>
              <a href="#services" className="hover:text-indigo-600">About us</a>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-600">Delivery</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-600">Privacy policy</a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="flex-1 bg-green-300">
          <h2 className="text-md md:text-lg mb-2">Get in Touch</h2>
          <ul className="space-y-1 text-xs md:text-sm">
            <li>Phone: <a href="tel:+1234567890" className="hover:text-indigo-600">+123 456 7890</a></li>
            <li>Email: <a href="mailto:info@company.com" className="hover:text-indigo-600">info@company.com</a></li>
          </ul>
        </div>
    </footer>
  );
};

export default Footer;
