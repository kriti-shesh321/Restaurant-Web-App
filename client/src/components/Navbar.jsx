import { useContext, useState } from "react";
import { NavLink } from 'react-router-dom';
import { FaBars, FaWindowClose } from 'react-icons/fa';
import AuthContext from "../context/Auth/AuthContext";
import image from '/image.png';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const activeLinkClass = ({ isActive }) => isActive ? "font-bold hover:shadow-lg text-maroon px-2 py-1 underline" : "font-bold hover:bg-red-300 hover:shadow-lg px-2 py-1";

    const handleSetActive = () => {
        setIsNavbarOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 shadow-md font-text1 bg-white text-black px-5 lg:px-28 pt-[2%] pb-[2%] lg:pb-[1%]">
                <div className="flex justify-between items-end">
                    <NavLink
                        to="/"
                        className="h-fit flex lg:gap-2 items-end"
                    >
                        <img
                            className="h-10 w-auto rounded-full shadow-md"
                            src={image}
                            alt="Asian Delight Restaurant Logo"
                        />
                        <span className="text-2xl md:text-3xl lg:text-4xl font-black font-title rounded-md text-maroon"
                        >
                            Asian Delight
                        </span>
                    </NavLink>

                    <div className="lg:hidden text-lg md:text-2xl">
                        {isNavbarOpen
                            ?
                            <FaWindowClose
                                className="text-maroon cursor-pointer absolute top-5 right-5"
                                onClick={() => setIsNavbarOpen(false)}
                            />
                            :
                            <FaBars
                                className="text-maroon cursor-pointer absolute top-5 right-5"
                                onClick={() => setIsNavbarOpen(true)}
                            />
                        }
                    </div>

                    <div className={isNavbarOpen
                        ? "max-h-[300px] absolute top-[100%] left-0 z-50 w-full bg-white transition-all duration-300 ease-in-out space-y-3 py-2 text-sm md:text-lg flex flex-col"
                        : "max-h-0 hidden lg:flex lg:justify-between lg:gap-3 lg:items-end"
                    }
                    >
                        <NavLink
                            to="/"
                            onClick={() => handleSetActive()}
                            className={activeLinkClass}
                        >
                            HOME
                        </NavLink>

                        <NavLink
                            to="/menu"
                            onClick={() => handleSetActive()}
                            className={activeLinkClass}
                        >
                            EXPLORE OUR FOOD
                        </NavLink>

                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            onClick={() => setIsDropdownOpen((prevState) => (!prevState))}
                        >
                            <button
                                className="flex font-bold hover:bg-red-300 hover:shadow-lg px-2 py-1"
                            >
                                <span>ABOUT US</span>

                                <svg className="w-2.5 h-2.5 ms-1.5 mt-1.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div
                                className={isDropdownOpen ? "block md:left-0 left-20 absolute bg-white shadow-md rounded" : "hidden"}
                            >
                                <a
                                    href="/#about"
                                    onClick={() => handleSetActive()}
                                    className="block font-[550] px-3 py-2 hover:bg-gray-200"
                                >
                                    ABOUT US
                                </a>
                                <a
                                    href="/#reviews"
                                    onClick={() => handleSetActive()}
                                    className="block font-[550] px-3 py-2 hover:bg-gray-200"
                                >
                                    REVIEWS
                                </a>

                                <a
                                    href="/#contact"
                                    onClick={() => handleSetActive()}
                                    className="block font-[550] px-3 py-2 hover:bg-gray-200"
                                >
                                    CONTACT
                                </a>
                            </div>
                        </div>

                        {!user &&
                            <NavLink
                                to="/signup"
                                onClick={() => handleSetActive()}
                                className={activeLinkClass}
                            >
                                SIGNUP/LOGIN
                            </NavLink>
                        }

                        {user &&
                            <NavLink
                                to="/my-profile"
                                onClick={() => handleSetActive()}
                                className={activeLinkClass}
                            >
                                PROFILE
                            </NavLink>
                        }

                        <NavLink
                            to="/menu"
                            onClick={() => handleSetActive("")}
                            className="hidden lg:inline border-4 border-maroon bg-maroon hover:bg-red-600 hover:shadow-lg hover:scale-110 text-white font-bold md:px-4 px-2 py-1"
                        >
                            ORDER ONLINE
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navbar;