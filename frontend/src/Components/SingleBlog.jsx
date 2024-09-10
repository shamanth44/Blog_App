import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { useSelector } from "react-redux";

function SingleBlog() {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.blogs).find(
    (blog) => blog._id === id
  );
  console.log(blog);

  // title
  // image
  // created by and details createdAt
  // descrption

  return (
    <div className="flex justify-center mt-20 h-max">
      <div className="flex flex-col w-2/3">
        <h1 className="font-bold text-[18px]">{blog?.title}</h1>

        <img src={blog?.image} alt="" className="mt-4 object-contain" />

        <div className="flex gap-20 mt-3">
          <div className="flex  gap-2">
            <img
              src={blog.createdBy?.image}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-[13px] text-slate-600">Written by</p>
              <p className="text-[14px] font-semibold text-slate-800">
                {blog?.createdBy.name}
              </p>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Published on</p>
            <p className="text-[12px] text-slate-400">
              {moment(blog.createdAt).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>

        <p className="text-slate-500 text-justify text-xl tracking-wide font-thin leading-relaxed mt-4">{blog.description}</p>
      </div>
    </div>
  );
}

export default SingleBlog;

