import React from "react";
import moment from "moment";

import { useNavigate } from "react-router-dom";


function Blogs({ blog }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col basis w-96 cursor-pointer" onClick={() => {navigate(`/blog/${blog._id}`)}}>
      <img src={blog.image} alt="" className="w-96 object-cover" />

      <div className="flex flex-col py-2 h-full justify-between gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={blog.createdBy?.image}
              alt=""
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-[12px] text-slate-600">Written by</p>
              <p className="text-[13px] font-semibold text-slate-800">{blog.createdBy?.name}</p>
            </div>
          </div>

          <div>
          <p className="text-[11px] text-slate-400">Published on</p>
            <p className="text-[12px] text-slate-400">
              {moment(blog.createdAt).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>

        <h1 className="font-bold text-[16px]">{blog.title}</h1>
        <p className="text-slate-500 text-[13px]">
          {blog.description?.length >= 185
            ? blog.description.slice(0, 185) + "..."
            : blog.description + "..."}
        </p>
        <p className="border self-start py-[2px] px-2 rounded-full bg-gray-100 text-xs">{blog.category ? blog.category.name : "Not specified"}</p>

      </div>
    </div>
  );
}

export default Blogs;

