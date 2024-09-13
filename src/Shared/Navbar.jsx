import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import logoimage from '../assets/Logo/Logo.png'

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const nav = <>
        <li><a>Home</a></li>
        <li><a>About</a></li>
    </>

    return (
        <div className="relative">
            {/* Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleDrawer}
                ></div>
            )}

            {/* Side Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-base-100 z-50 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}
            >
                <div className="p-4">
                    <a className="btn btn-ghost text-xl mb-4">Eventify</a>
                    <ul className="menu menu-vertical">
                        {nav}
                    </ul>
                </div>
            </div>

            {/* Navbar */}
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <button className="btn btn-ghost lg:hidden" onClick={toggleDrawer}>
                        <HiMenu className="h-5 w-5" />
                    </button>
                    <div className='flex items-center gap-2'>
                        <img className='w-10' src={logoimage} alt="" />
                        <p className=" text-4xl font-bold hidden lg:flex">Eventify</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                       {nav}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;