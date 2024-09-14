import  { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) {  // Adjust this value based on your banner height
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
      <div className={`relative px-5 lg:px-14 xl:px-44 py-3 transition-all duration-500 ease-in-out flex justify-between items-center ${scrolled ? 'text-black' : 'text-white'}`}>
        <div>
          <Link to="/" className={`text-xl font-serif italic sm:text-2xl font-semibold ${scrolled ? 'text-pink-400' : 'text-white'}`}>
            <h1>Eventify</h1>
          </Link>
        </div>
        <div>
          <ul className="md:flex sm:gap-5 xl:gap-10 text-[17px] font-normal hidden">
            {['Home', 'Events', 'Reels', 'Gallery', 'Profile'].map((item) => (
              <li key={item} className={`cursor-pointer font-semibold ${scrolled ? 'text-black hover:text-pink-400' : 'text-white hover:text-pink-400'}`}>
                <Link >{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`md:hidden hover:cursor-pointer text-2xl z-20 ${scrolled ? 'text-black' : 'text-pink-400'}`}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;