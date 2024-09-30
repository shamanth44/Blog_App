import React from "react";
import moment from "moment"
import { useNavigate } from "react-router-dom";

function BlogLayout({blog}) {

  const navigate = useNavigate();

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };


  return (
    <>
    {blog.length !== 0 ?
      <h1 className="px-5 sm:px-16 sm:text-xl text-base font-semibold">Recent blogs</h1> : <p className="px-5 md:px-16 text-[32px] mt-5 font-semibold">Loading...</p>
    }
      <div className="px-5 sm:px-16 mt-3 grid gap-6 grid-rows-4 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 xl:grid-rows-3 xl:grid-cols-2">

        { blog?.length !== 0 && blog?.slice(blog?.length - 4).reverse().map((blog, index) => {
          return (
            <div  key={index} className={`flex flex-col gap-1 border cursor-pointer ${index !== 0 ? "xl:flex-row rounded-lg" : ""} ${index === 0 ? "xl:row-span-3 xl:flex-col sm:flex-col rounded-lg" : ""}`}>

              <img src={blog?.image} alt="img" className={`h-3/4 aspect-video lg:aspect-auto sm:rounded-bl-none sm:rounded-tr-lg object-cover ${index !== 0 ? "xl:rounded-bl-lg sm:w-auto xl:h-auto xl:w-72 rounded-t-lg xl:rounded-tr-none sm:rounded-tr-lg sm:rounded-l-lg" : ""} ${index === 0 ? "object-cover xl:rounded-bl-none xl:h-3/4 rounded-t-lg xl:w-[700px]" : ""}`} onClick={() => {navigate(`/blog/${blog?._id}`)}} />

              <div className={`flex items p-2 gap-2 ${index === 0 ? "" : ""} flex-col justify-between`}> 
                    <div className="flex justify-between">
                    <div className="flex items-center gap-2" onClick={() => {navigate(`/blog-author/${blog?.createdBy?._id}`)}}>
                     <img src={blog?.createdBy?.image} alt="" className="w-8 h-8 rounded-full object-cover"/>
                     <div >
                     <p className="text-[12px] text-slate-600">Written by</p>
                     <p className="text-[13px] font-semibold text-slate-800">{blog?.createdBy?.name}</p>
                     </div>
                     </div>
                     <div>
                     <p className="text-[11px] text-slate-400">Published on</p>
                     <p className="text-[11px] text-slate-400">{moment(blog?.createdAt).format('MMM Do YYYY')}</p>
                     </div>
                    </div>
                      <h1 className="font-bold text-[14px] self-start text-gray-600 hover:text-black" onClick={() => {navigate(`/blog/${blog?._id}`)}}>{blog?.title}</h1>
                      <p className="text-slate-500 text-[13px]" onClick={() => {navigate(`/blog/${blog?._id}`)}}>{blog?.description?.length >= 80
                          ? stripHtmlTags(blog?.description).slice(0, 80) + "..."
                          : stripHtmlTags(blog?.description) + "..."}</p>

                    <p className="border self-start sm:py-[2px] px-2  sm:px-2 rounded-full bg-gray-100 text-[11px] sm:text-xs">{blog?.category ? blog?.category?.name : "Not specified"}</p>

              </div>
              
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BlogLayout;
