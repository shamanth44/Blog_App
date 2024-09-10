import React from "react";
import { Link } from 'react-router-dom'

function Navbar() {
  
  return (
    <>
      <div className="flex justify-between md:px-20 px-5 items-center h-16">
        <div className="list-none flex gap-10 items-center">
          <Link to={"/"} className="cursor-pointer font-bold text-2xl text-blue-500 tracking-[2px]">YOUR BLOG</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link to={"/create-blog"} className="cursor-pointer tracking-wider">Write</Link>
          <Link to={"/signup"} className="tracking-wider border text-center text-sm text-white border-black p-2 rounded-md w-28 bg-neutral-900">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
