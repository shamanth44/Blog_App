import React from "react";
import moment from "moment"
import { useNavigate } from "react-router-dom";

function BlogLayout({blog}) {

  const navigate = useNavigate();

  return (
    <>
    {blog.length !== 0 ?
      <h1 className="px-5 md:px-16 md:text-xl text-base font-semibold">Recent blogs</h1> : <p className="px-16 text-[32px] mt-5 font-semibold">Loading...</p>
    }
      <div className="px-5 md:px-16 mt-3 grid gap-6 md:grid-rows-3 grid-rows-4 md:grid-cols-2 grid-cols-1">

        { blog.length !== 0 && blog.slice(blog?.length - 4).reverse().map((blog, index) => {
          return (
            <div  key={index} className={`flex flex-col gap-1 border ${index !== 0 ? "md:flex-row rounded-lg" : ""} cursor-pointer ${index === 0 ? "md:row-span-3 rounded-lg" : ""}`}>

              <img src={blog.image} alt="img" className={`h-3/4 md:h-auto object-cover ${index !== 0 ? "rounded-t-lg md:rounded-tr-none md:rounded-l-lg md:w-72 " : ""} ${index === 0 ? "md:h-4/5 object-cover rounded-t-lg" : ""}`} onClick={() => {navigate(`/blog/${blog._id}`)}} />

              <div className={`flex items p-2 gap-2 ${index === 0 ? "" : ""} flex-col justify-between`}> 
                    <div className="flex justify-between">
                    <div className="flex items-center gap-2" onClick={() => {navigate(`/blog-author/${blog.createdBy?._id}`)}}>
                     <img src={blog.createdBy?.image} alt="" className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"/>
                     <div >
                     <p className="text-[9px] md:text-[12px] text-slate-600">Written by</p>
                     <p className="text-[10px] md:text-[13px] font-semibold text-slate-800">{blog.createdBy?.name}</p>
                     </div>
                     </div>
                     <div>
                     <p className="text-[9px] md:text-[11px] text-slate-400">Published on</p>
                     <p className="text-[9px] md:text-[11px] text-slate-400">{moment(blog.createdAt).format('MMM Do YYYY')}</p>
                     </div>
                    </div>
                      <h1 className="font-bold text-[12px] md:text-[14px] self-start text-gray-600 hover:text-black" onClick={() => {navigate(`/blog/${blog._id}`)}}>{blog.title}</h1>
                      <p className="text-slate-500 text-[11px] md:text-[13px]" onClick={() => {navigate(`/blog/${blog._id}`)}}>{index === 0 && blog.description?.length >= 100
                    ? blog.description.slice(0, 100) + "..." 
                    : index >= 1 && blog.description?.length >= 100
                    ? blog.description.slice(0, 100) + "..."
                    : blog.description + "..."}</p>

                    <p className="border self-start md:py-[2px] px-1  md:px-2 rounded-full bg-gray-100 text-[11px] md:text-xs">{blog.category ? blog.category.name : "Not specified"}</p>

              </div>
              
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BlogLayout;
