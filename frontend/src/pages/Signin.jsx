import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, loginUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


//   const formData = new FormData();
//   formData.append("email", email);
//   formData.append("password", password);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
      await dispatch(loginUser({email, password})).unwrap();
      await dispatch(getUser()).unwrap();
      navigate("/");
  };
  return (
    <>
      <div className="flex mt-10 sm:mt-0 sm:h-screen justify-center items-center gap-10">
        {/* left */}
        <div className="flex flex-col justify-between gap-2">


          <h2 className="font-bold text-2xl">Sign in</h2>



          <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col">
          <label htmlFor="email">Email<span>*</span></label>
          <input
            id="email"
            type="text"
            placeholder="email"
            className="border rounded-lg py-2 px-3 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            />
          </div>
         <div className="flex flex-col">
         <label htmlFor="password">Password<span>*</span></label>
          <input
            id="password"
            type="text"
            placeholder="password"
            className="border rounded-lg py-2 px-3 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
         </div>
        </div>
          <button className="mt-8 tracking-wider border text-center text-sm text-white border-black p-2 rounded-md w-full bg-neutral-900" onClick={handleSubmit}>
            Sign in
          </button>
          <Link to={"/signup"} className="text-center text-slate-500 text-[13px]">Don't have an account? <span className="text-black underline font-bold underline-offset-4 cursor-pointer">Sign up</span></Link>

        </div>
      </div>
    </>
  );
}

export default Signin;
