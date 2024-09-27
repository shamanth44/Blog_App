import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { getUserData } from '../features/user/userSlice';
import Blogs from '../pages/Blogs';
import { deleteBlog } from '../features/blogs/blogSlice';


function UserProfile() {

const dispatch = useDispatch();
const [detail, setDeatil] = useState("home");
const {userData, isLoading} = useSelector((state)=> state.auth)
const user = userData?.user
console.log(user)

const handleItemClick = (item) => {
  setDeatil(item);
};

useEffect(()=>{
  async function getUser() {
    await dispatch(getUserData()).unwrap()
  }
  getUser();
},[])

const handleDelete = async (blogId) => {
  await dispatch(deleteBlog(blogId)).unwrap()
  dispatch(getUserData());
}


  return (
    <div>
      {!isLoading && user !== null ? (
        <div className="flex flex-col md:flex-row justify-between border-b-[1px]">
          {/* left */}
          <div className="md:hidden block">
            <img src={"https://res.cloudinary.com/shamanth-ganiger/image/upload/v1727007183/thought-catalog-505eectW54k-unsplash_c8jtsq.jpg"} alt="cover-photo" className="h-[20vh] w-full object-cover" />
          </div>
          <div className="px-5 md:pl-16 flex justify-between md:justify-start flex-col gap-6 items-start sm:basis-1/4 md:sticky top-20 mt-10 md:h-screen">
            <div className="flex items-center md:flex-col gap-5">
              <img
                src={user?.image}
                alt=""
                className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] object-cover rounded-full"
              />
              <div className="whitespace-nowrap flex flex-col gap-1">
                <p className="text-xl font-semibold md:text-base md:font-normal">
                  {user?.name}
                </p>
                <p className="text-gray-500">1456 Followers</p>
              </div>
            </div>
          </div>

      <div className="w-[0.5px] bg-gray-300 hidden sm:block"></div>
          {/* right */}
          <div className="basis-4/6 flex flex-col gap-10 px-5 pb-10 md:pl-0 md:pr-16">
          <div className="hidden md:block">
            <img src={"https://res.cloudinary.com/shamanth-ganiger/image/upload/v1727007183/thought-catalog-505eectW54k-unsplash_c8jtsq.jpg"} alt="cover-photo" className="h-[25vh] w-full object-cover" />
          </div>
            <div className="">
              <h1 className="text-4xl mt-10 text-gray-800 font-semibold hidden md:block">
                {user?.name}
              </h1>
            </div>
            <div className="border-b-[1.7px] flex gap-6 pb-2">
              <button
                className={`${
                  detail === "home"
                    ? "text-blue-500 underline decoration-[1.6px]  decoration-blue-500 underline-offset-[13.2px]"
                    : "text-gray-400"
                } hover:text-blue-500 text-sm tracking-wider`}
                onClick={() => handleItemClick("home")}
              >
                Home
              </button>
              <button
                className={`${
                  detail === "about"
                    ? "text-blue-500 underline decoration-[1.6px]  decoration-blue-500 underline-offset-[13.2px]"
                    : "text-gray-400"
                } hover:text-blue-500 text-sm tracking-wider`}
                onClick={() => handleItemClick("about")}
              >
                About
              </button>
            </div>

            <div className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_280px))] gap-10'>
              {detail === "home" && user?.blogs?.length !== 0
                ? user?.blogs?.map((blog, index) => {
                    return <Blogs key={index} author={true} blog={blog} onDelete={()=> handleDelete(blog._id)} />
                  })
                : detail === "home" && user?.blogs?.length === 0 && <p className='font-extrabold text-3xl whitespace-nowrap'>No Published Blogs</p>}
              {detail === "about" && <p>About</p>}
              
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default UserProfile