import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 
import Divider from '../components/Divider';


const Layout2 = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen mx-4 gap-2">
      {/* HEADER */}
      <header className="flex flex-col py-2">
        <Navbar />
      </header>

      <Divider />

      {/* MAIN CONTENT */}
      <main className="flex-grow my-2">
        {children}
      </main>

      <Divider />

      {/* FOOTER (NOTE:REMEMBER TO INSERT COPYRIGHT) */}
      <footer className="flex flex-col py-4">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout2;
