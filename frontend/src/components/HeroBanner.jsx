import React from 'react';
import headerImg from '../assets/header_img-DhAi3lLA.png'; 
import {MoveRight} from 'lucide-react'

const HeroBanner = () => {
  return (
    <section className="relative w-full h-auto bg-blue-500 rounded-md flex flex-col md:flex-row">
      {/* TAGLINE */}
      <div className="flex flex-col flex-1 p-6 justify-center space-y-4">
        <h1 className="text-xl md:text-4xl font-bold text-white">
          Book Appointment with Trusted Doctors
        </h1>
        <div className="flex flex-col space-y-2">
          <img
            src="" 
            alt="Image here"
            className="w-16 h-16 object-cover rounded-full border-2 border-white"
          />
          <p className="text-white text-xs md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, aperiam iusto! Dolorum.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 w-fit bg-indigo-600 text-xs text-white py-2 px-4 rounded-full hover:bg-indigo-500 transition">
          Book Appointment
          <MoveRight size={20} />
        </button>
      </div>

      {/* IMAGE */}
      <div className="flex flex-1 items-end">
        <img
          src={headerImg}
          alt="Hero Banner"
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
