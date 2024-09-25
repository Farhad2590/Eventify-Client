import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Tooltip } from 'react-tooltip';
import Button from "../Shared/Button";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="w-full sticky top-0 z-30 bg-white transition-all duration-300 relative ">
      <div>
        <div className="relative px-5 lg:px-14 xl:px-44 py-3 transition-all duration-500 ease-in-out flex justify-between items-center text-black z-10">
          <div>
            <Link to="/" className="text-xl font-serif italic sm:text-2xl font-semibold text-blue-600">
              <h1>Eventify</h1>
            </Link>
          </div>
          <div>
            <ul className="md:flex sm:gap-5 xl:gap-10 text-[17px] font-normal hidden">
              {user ? (
                <>
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
                </>
              ) : null}
              
              <Tooltip id="my-tooltip" />
              {user ? (
                <div data-tooltip-id="my-tooltip" data-tooltip-place="right" data-tooltip-content={user?.displayName || 'name not found'} className="dropdown dropdown-end z-[40]">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img src={user?.photoURL || 'https://avatars.githubusercontent.com/u/86664820?v=4'} alt="User avatar" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <Button onClick={logout} name="Logout" className=""></Button>
                    </li>
                  </ul>
                </div>
              ) : (
                <li className="cursor-pointer font-semibold text-black hover:text-blue-600">
                  <Link className="btn bg-blue-600 text-white hover::bg-white hover:text-blue-600" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="md:hidden hover:cursor-pointer text-2xl z-20 text-black">
            {/* Mobile menu icon */}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {/* ... (decorative elements remain unchanged) ... */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;