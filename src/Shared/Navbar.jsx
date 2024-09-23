import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-30 bg-white transition-all duration-300">
      <div className="relative px-5 lg:px-14 xl:px-44 py-3 transition-all duration-500 ease-in-out flex justify-between items-center text-black">
        <div>
          <Link to="/" className="text-xl font-serif italic sm:text-2xl font-semibold text-blue-600">
            <h1>Eventify</h1>
          </Link>
        </div>
        <div>
          <ul className="md:flex sm:gap-5 xl:gap-10 text-[17px] font-normal hidden">
            <li className="cursor-pointer font-semibold text-black hover:text-blue-600">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer font-semibold text-black hover:text-blue-600">
              <Link to="/add-event">Events</Link>
            </li>
            <li className="cursor-pointer font-semibold text-black hover:text-blue-600">
              <Link to="/reels">Reels</Link>
            </li>
            <li className="cursor-pointer font-semibold text-black hover:text-blue-600">
              <Link to="/gallery">Gallery</Link>
            </li>
            <li className="cursor-pointer font-semibold text-black hover:text-blue-600">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden hover:cursor-pointer text-2xl z-20 text-black">
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
