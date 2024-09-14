import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../features/user/auth";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        scrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      } sticky shadow top-0 z-10 flex justify-between items-center h-14 px-5 md:px-20 transition-all duration-300`}
    >
      <div className="list-none flex gap-10 items-center">
        <Link
          to={"/"}
          className="cursor-pointer font-bold text-2xl text-blue-500 tracking-[2px]"
        >
          YOUR BLOG
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          to={"/create-blog"}
          className={`flex text-gray-500 ${scrolled ? "text-gray-300 hover:text-gray-50" : "hover:text-black"} gap-2 cursor-pointer tracking-wider`}
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
        {isAuthenticated ? (
          <Link>
            <img
              src={user?.loggedInUser?.image}
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
          </Link>
        ) : (
          <Link
            to={"/signup"}
            className={`tracking-wider border text-center text-sm ${scrolled ? "text-neutral-900 border-white p-2 bg-white" : "text-white border-black p-2 bg-neutral-900"} rounded-full w-28`}
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
