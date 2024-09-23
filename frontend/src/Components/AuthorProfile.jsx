import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blogs from "../pages/Blogs";
import { useSelector } from "react-redux";

function AuthorProfile() {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDeatil] = useState("home");
  const [show, setShow] = useState(true);
  const { authorId } = useParams();

  const handleItemClick = (item) => {
    setDeatil(item);
  };

  const showButton = () => {
    setShow(!show);
  };

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/get-author/${authorId}`,
        { withCredentials: true }
      );
      setAuthor(response.data.author);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  console.log(author);

  return (
    <div>
      {!loading ? (
        <div className="px-5 sm:px-16 flex flex-col md:flex-row justify-between border-b-[1px]">
          {/* left */}
          <div className="md:hidden block">
            <img src={"https://res.cloudinary.com/shamanth-ganiger/image/upload/v1727007183/thought-catalog-505eectW54k-unsplash_c8jtsq.jpg"} alt="cover-photo" className="h-[25vh] w-full object-cover" />
          </div>
          <div className="flex justify-between md:justify-start md:flex-col gap-6 items-start sm:basis-1/4 md:sticky top-20 mt-10 md:h-screen">
            <div className="flex items-center md:flex-col gap-5">
              <img
                src={author.image}
                alt=""
                className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] object-cover rounded-full"
              />
              <div className="whitespace-nowrap flex flex-col gap-1">
                <p className="text-xl font-semibold md:text-base md:font-normal">
                  {author.name}
                </p>
                <p className="text-gray-500">1456 Followers</p>
              </div>
            </div>
            {show && (
              <button
                onClick={showButton}
                className="bg-blue-700 border border-blue-700 text-white hover:bg-blue-900 px-6 py-1 rounded-full"
              >
                Follow
              </button>
            )}
            {!show && (
              <button
                onClick={showButton}
                className="border border-blue-700 text-blue-700 px-6 py-1 rounded-full"
              >
                Following
              </button>
            )}
          </div>

      <div className="w-[1px] bg-gray-300 hidden sm:block"></div>
          {/* right */}
          <div className="basis-4/6 flex flex-col gap-10 md:pb-10">
          <div className="hidden md:block">
            <img src={"https://res.cloudinary.com/shamanth-ganiger/image/upload/v1727007183/thought-catalog-505eectW54k-unsplash_c8jtsq.jpg"} alt="cover-photo" className="h-[25vh] w-full object-cover" />
          </div>
            <div className="">
              <h1 className="text-4xl text-gray-800 font-semibold hidden md:block">
                {author.name}
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

            <div className='grid pb-10 grid-cols-[repeat(auto-fit,_minmax(250px,_310px))] gap-10'>
              {detail === "home" && author.blogs.length !== 0
                ? author.blogs.map((blog, index) => {
                    return <Blogs key={index} blog={blog} />
                  })
                : detail === "home" && <p>No blogs found</p>}
              {detail === "about" && <p>About</p>}
              
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AuthorProfile;
