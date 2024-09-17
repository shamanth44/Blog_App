import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../features/user/auth";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [popup, setPopup] = useState(false);
  // const user = useSelector((state) => state.auth.user);
  // const { isAuthenticated, loading } = useAuth(); 
  const { isAuthenticated, isLoading, user } =  useSelector((state) => state.auth)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
        setPopup(false);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setPopup(!popup);
  };

  return (
    <div
      className={`${
        scrolled ? "bg-black bg-opacity-90" : "bg-white"
      } sticky shadow top-0 z-10 flex justify-between items-center h-14 px-5 md:px-20 transition-all duration-300`}
    >
      <div className="list-none flex gap-10 items-center">
        <Link
          to={"/"}
          className="cursor-pointer font-bold text-2xl text-blue-700 tracking-[2px]"
        >
          ScribbleHub
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          to={"/create-blog"}
          className={`flex text-gray-500 ${
            scrolled ? "text-gray-300 hover:text-gray-50" : "hover:text-black"
          } gap-2 cursor-pointer tracking-wider`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Write"
          >
            <path
              fill="currentColor"
              d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
            ></path>
            <path
              stroke="currentColor"
              d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
            ></path>
          </svg>
          <span className="tracking-wider">Write</span>
        </Link>

        {/* Check loading state before rendering isAuthenticated content */}
        {!isLoading && (
          isAuthenticated ? (
            <div>
              <img
                src={user?.user?.image}
                alt="user"
                className="w-8 h-8 object-cover rounded-full cursor-pointer"
                onClick={handleClick}
              />
            </div>
          ) : (
            <Link
              to={"/signin"}
              className={`tracking-wider border text-center text-sm ${
                scrolled
                  ? "text-neutral-900 border-white p-2 bg-white"
                  : "text-white border-black p-2 bg-neutral-900"
              } rounded-full w-28`}
            >
              Get Started
            </Link>
          )
        )}
      </div>

      {popup && (
        <div className="h-44 w-56 top-16 bg-white absolute -right-5 border rounded-md mr-20 shadow-lg">
          <div className="list-none flex flex-col p-6 gap-4 text-gray-500 text-sm">
            <Link
              to={"/profile"}
              className="cursor-pointer hover:text-black flex items-center gap-3"
              onClick={() => setPopup(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Profile"
              >
                <circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"
                ></path>
              </svg>
              <li>Profile</li>
            </Link>
            <li className="cursor-pointer hover:text-black">Sign out</li>
            <li className="cursor-pointer hover:text-black">Help</li>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
