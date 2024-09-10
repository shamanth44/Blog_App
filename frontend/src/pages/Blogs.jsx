import React from "react";
import moment from "moment";

function Blogs({ blog }) {

  return (
    <div className="flex flex-col basis w-96 cursor-pointer">
      <img src={blog.image} alt="" className="w-96 object-cover" />

      <div className="flex flex-col py-2 gap-2">
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
            <p className="text-[12px] text-slate-400">
              {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
        </div>

        <h1 className="font-bold text-[16px]">{blog.title}</h1>
        <p className="text-slate-500 text-[13px]">
          {blog.description?.length >= 185
            ? blog.description.slice(0, 185) + "..."
            : blog.description + "..."}
        </p>
      </div>
    </div>
  );
}

export default Blogs;

