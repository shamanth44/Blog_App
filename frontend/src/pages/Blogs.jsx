import React from "react";
import moment from "moment";

import { useNavigate } from "react-router-dom";




function Blogs({ blog, author, onDelete }) {
  const navigate = useNavigate();

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const previewDescription = blog.description?.length >= 80
    ? stripHtmlTags(blog.description).slice(0, 80) + "..."
    : stripHtmlTags(blog.description) + "...";

  return (
    <div className="flex flex-col border rounded-lg justify-between overflow-hidden max-w-80">
      <img src={blog.image} alt="" className="aspect-video object-cover cursor-pointer" onClick={() => {navigate(`/blog/${blog._id}`)}}/>

      <div className="flex flex-col gap-3 p-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {navigate(`/blog-author/${blog.createdBy?._id}`)}}>
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
              {moment(blog.createdAt).format("MMM Do YYYY")}
            </p>
          </div>
        </div>

        <h1 className="font-bold text-[13px] self-start cursor-pointer text-gray-600 hover:text-black" onClick={() => {navigate(`/blog/${blog._id}`)}}>{blog.title}</h1>
        
        <p className="text-slate-500 text-[12px] cursor-pointer"  onClick={() => {navigate(`/blog/${blog._id}`)}}>
        {previewDescription}
        </p>
        <div className="flex justify-between">
        <p className="border py-[2px] px-2 rounded-full bg-gray-100 text-xs">{blog.category ? blog.category.name : "Not specified"}</p>
        {author && <button className="mr-4 text-sm text-gray-600 underline" onClick={onDelete}>Delete</button>}
        </div>
      </div>
    </div>
  );
}

export default Blogs;

