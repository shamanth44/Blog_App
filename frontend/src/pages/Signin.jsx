import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


//   const formData = new FormData();
//   formData.append("email", email);
//   formData.append("password", password);

  const dispatch = useDispatch( );
  const handleSubmit = async () => {
      const res = await dispatch(loginUser({email, password})).unwrap();
      navigate("/");
  };
  return (
    <>
      <div className="flex w-1/2 justify-center items-center bg-slate-700 h-3/4 text-white">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="email"
            className="text-black"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="password"
            className="text-black"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="bg-white text-black mt-10" onClick={handleSubmit}>
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default Signin;
