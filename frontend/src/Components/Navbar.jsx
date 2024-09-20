import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../features/user/userSlice";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handlePopUpClick = () => {
    setPopup(false)
  }
  

  const handleSubmit = async () => {
      const res = await dispatch(logOutUser()).unwrap();
      setPopup(false)
      console.log(res)
      navigate("/");
  };

  return (
    <div
      className={`${
        scrolled ? "bg-black bg-opacity-90" : "bg-white"
      } sticky shadow top-0 z-10 flex justify-between items-center h-14 px-5 md:px-16 transition-all duration-300`}
    >
      <div className="list-none flex gap-10 items-center">
        <Link
          to={"/"}
          className="cursor-pointer font-bold md:text-2xl text-blue-700 tracking-[2px]"
        >
          ScribbleHub
        </Link>
      </div>
      <div className="flex gap-3 md:gap-4 items-center">
        <Link
          to={"/create-blog"}
          className={`flex text-gray-500  ${
            scrolled
              ? "text-gray-300 hover:text-blue-500"
              : "hover:text-blue-500"
          } gap-2 cursor-pointer tracking-wider`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
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
          <span className="tracking-wider text-sm md:text-base">Write</span>
        </Link>

        {/* Check loading state before rendering isAuthenticated content */}
        {!isLoading &&
          (isAuthenticated ? (
            <div className="relative cursor-pointer" onClick={handleClick}>
              <img
                src={user?.user?.image}
                alt="user"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-all duration-200 rounded-full"></div>
            </div>
          ) : (
            <Link
              to={"/signin"}
              className={`tracking-wider border text-center p-2 md:p-2 text-xs md:text-sm ${
                scrolled
                  ? "text-neutral-900 border-white bg-white"
                  : "text-white border-black bg-neutral-900"
              } rounded-full w-24 md:w-28`}
            >
              Get Started
            </Link>
          ))}
      </div>

      {popup && (
        <div className="h-44 w-36  md:w-56 top-16 bg-white absolute -right-12 md:-right-5 border rounded-md mr-20 shadow-lg">
          <div className="list-none flex flex-col p-6 gap-4 text-gray-500 text-sm">
            <Link
              to={"/profile"}
              className="cursor-pointer hover:text-blue-500 flex items-center gap-3"
              onClick={handlePopUpClick}
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
            <button className="cursor-pointer self-start hover:text-blue-500"  onClick={handleSubmit}>Sign out</button>
            <li className="cursor-pointer hover:text-blue-500">Help</li>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
