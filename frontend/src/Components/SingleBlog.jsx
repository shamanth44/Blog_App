import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { useSelector } from "react-redux";

function SingleBlog() {
  const navigate = useNavigate();

  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.recentBlogs).find(
    (blog) => blog._id === id
  );

  return (
    <div className="px-5 sm:px-20 lg:px-28 xl:px-56 flex justify-center mt-10">
      <div className="flex flex-col">
        <h1 className="font-bold text-[18px]">{blog?.title}</h1>

        <img src={blog?.image} alt="" className="mt-4 object-contain" />

        <div className="flex justify-between md:justify-start md:gap-20 mt-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {navigate(`/blog-author/${blog.createdBy?._id}`)}}>
            <img
              src={blog.createdBy?.image}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-[12px] text-slate-600">Written by</p>
              <p className="text-[13px] font-semibold text-slate-800">
                {blog?.createdBy.name}
              </p>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Published on</p>
            <p className="text-[12px] text-slate-400">
              {moment(blog.createdAt).format("MMM Do YYYY")}
            </p>
          </div>
        </div>

        {/* <p className="text-slate-500 text-justify text-xl tracking-wide font-thin leading-relaxed mt-4">{blog.description}</p> */}
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: blog.description }}>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;

