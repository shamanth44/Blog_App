import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState([])

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append('image', image);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
  console.log(formData);
    dispatch(registerUser(formData));
  };
  return (
    <>
      <div className="flex  justify-center items-center gap-10">
        {/* left */}
        <div className="flex flex-col justify-between h-full gap-6">


          <h2 className="font-bold text-2xl">Create Account</h2>



          <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col">
          <label htmlFor="name">Name<span>*</span></label>
          <input
            id="name"
            type="text"
            placeholder="name"
            className="border rounded-lg py-2 px-3 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          </div>
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
         <div className="flex flex-col">
         <label htmlFor="image">Profile picture</label>
          <input
            id="image"
            type="file"
            placeholder="Choose file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            />
         </div>
        </div>


          <button className="mt-8 tracking-wider border text-center text-sm text-white border-black p-2 rounded-md w-full bg-neutral-900" onClick={handleSubmit}>
            Sign Up
          </button>
          <Link to={"/signin"} className="text-center text-slate-500 text-[13px]">Already have an account? <span className="text-black underline font-bold underline-offset-4 cursor-pointer">Log in</span></Link>
          <p className="mt-14 text-center text-slate-500 text-xs">By creating an account, you agree to our <span className="underline underline-offset-3 cursor-pointer">terms of use.</span></p>


        </div>


        {/* right */}
        <div className="w-6/12 relative hidden md:inline">
        <img src={"https://res.cloudinary.com/shamanth-ganiger/image/upload/v1725799759/20210512081001_IMG_0025_sb7pbk.jpg"} alt="" className=" rounded-br-[100px] w-full object-cover h-[600px]" />
        <p className="text-center tracking-wider absolute top-1/2 text-gray-100 opacity-90 font-bold text-3xl px-20">Your words have the power to change the world. Start sharing your story today.</p>
        </div>
      </div>
    </>
  );
}

export default Signup;
