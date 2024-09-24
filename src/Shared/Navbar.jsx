import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Tooltip } from 'react-tooltip';
const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <nav className="w-full sticky top-0 z-30 bg-white transition-all duration-300 relative overflow-hidden">
      <div className="relative px-5 lg:px-14 xl:px-44 py-3 transition-all duration-500 ease-in-out flex justify-between items-center text-black z-10">
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
            <Tooltip id="my-tooltip" />
            {
              user ? <div data-tooltip-id="my-tooltip" data-tooltip-place="right" data-tooltip-content={user?.displayName || 'name not found'} className="dropdown dropdown-end  z-[4]" >
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar " >
                  <div className="w-10 rounded-full "  >
                    <img src={user?.photoURL || 'https://avatars.githubusercontent.com/u/86664820?v=4'} alt="" />

                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[4] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><button onClick={logout} className="btn btn-sm btn-ghost">Logout</button></li>
                </ul>
              </div> :
                <li className="cursor-pointer font-semibold text-black hover:text-pink-400">
                  <Link to="/login">Login</Link>
                </li>
            }



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
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-2 left-2 w-10 h-10 border-2 border-blue-600 rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-20 h-20 border-2 border-blue-600 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-12 h-12 border-2 border-blue-600 transform rotate-12"></div>
      </div>
    </nav>
  );
};

export default Navbar;