import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blogs from "../pages/Blogs";
import { useSelector } from "react-redux";

function AuthorProfile() {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDeatil] = useState("home");
  const { authorId } = useParams();

  const handleItemClick = (item) => {
    setDeatil(item);
  };

  const blogsRes = useSelector((state) => state.blogs);
  const blogs = blogsRes.blogs;

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

          <div className="flex justify-between md:justify-start md:flex-col gap-6 items-start sm:basis-1/4 md:sticky top-20 mt-10 md:h-screen">
            <div className="flex items-center md:flex-col gap-5">
              <img
                src={author.image}
                alt=""
                className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] object-cover rounded-full"
              />
              <div className="whitespace-nowrap flex flex-col gap-1">
                <p className="text-xl font-semibold md:text-base md:font-normal">{author.name}</p>
                <p className="text-gray-500">1456 Followers</p>
              </div>
            </div>
            <button className="bg-white border border-blue-700 text-blue-700 px-6 py-1 rounded-full">
              Follow
            </button>
          </div>

          <div className="w-[1px] bg-gray-300 hidden sm:block"></div>
          {/* right */}
          <div className="basis-4/6 flex flex-col gap-10 md:py-10">
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

            <div>
              {detail === "home" && author.blogs.length !== 0
                ? author.blogs.map((blog, index) => {
                    return (
                      <div key={index}>
                        <p>{blog.title}</p>
                      </div>
                    );
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
