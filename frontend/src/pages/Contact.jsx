import React from 'react';
import contactImg from '../assets/contact_image-IJu_19v_.png';

const Contact = () => {
  return (
    <article className="flex flex-col gap-4 justify-center items-center py-8">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl text-center mb-2">Contact Us</h2>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start w-full max-w-5xl">
        {/* IMAGE */}
        <div className="flex-[0.4] w-full md:w-auto min-w-[250px] overflow-hidden">
          <img
            src={contactImg}
            alt="Contact Us"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="flex-[0.6] flex flex-col gap-8">
          {/* Office Details */}
          <div className="flex flex-col gap-1">
            <h2 className="text-md md:text-lg mb-3">Our Office</h2>
            <p className="text-xs sm:text-sm text-gray-600">12345 Example Street</p>
            <p className="text-xs sm:text-sm text-gray-600">City, State, ZIP</p>
            <p className="text-xs sm:text-sm text-gray-600">Phone: (123) 456-7890</p>
            <p className="text-xs sm:text-sm text-gray-600">Email: contact@nurturemed.com</p>
          </div>

          {/* Careers Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-md md:text-lg">Careers at NurtureMed</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Learn more about our teams and explore current job openings.
            </p>
            <button className="bg-white text-slate-800 border border-slate-800 w-fit text-xs md:text-sm py-2 px-4 md:px-6 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Contact;
