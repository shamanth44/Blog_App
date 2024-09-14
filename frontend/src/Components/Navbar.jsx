import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

function Navbar() {

  const user = useSelector((state) => state.auth.user)
  
  return (
    <>
      <div className="flex justify-between md:px-20 px-5 items-center h-16">
        <div className="list-none flex gap-10 items-center">
          <Link to={"/"} className="cursor-pointer font-bold text-2xl text-blue-500 tracking-[2px]">YOUR BLOG</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link to={"/create-blog"} className="cursor-pointer tracking-wider">Write</Link>
          {user !== null ? 
          <Link><img src={user?.loggedInUser?.image} alt="" className="w-8 h-8 object-cover rounded-full" /></Link> : 
           <Link to={"/signup"} className="tracking-wider border text-center text-sm text-white border-black p-2 rounded-md w-28 bg-neutral-900">
            Get Started
            </Link> 
            }
        </div>
      </div>
    </>
  );
}

export default Navbar;
