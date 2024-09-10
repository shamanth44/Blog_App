import React from "react";
import moment from "moment"
import { useNavigate } from "react-router-dom";



function BlogLayout({blog}) {

  const navigate = useNavigate();

  return (
    <>
    {blog !== null ?
      <h1 className="px-20 text-[32px] text-xl font-semibold">Recent blogs</h1> : <p className="px-20 text-[32px] mt-5 font-semibold">Loading...</p>
    }
      <div className="px-20 mt-5 grid gap-6 md:grid-rows-3 grid-rows-4 md:grid-cols-2 grid-cols-1 cursor-pointer">

        { blog !== null && blog.slice(blog?.length - 4).reverse().map((item, index) => {
          console.log(item._id)     
          return (
            <div key={index} className={`flex gap-4 border ${index !== 0 ? "rounded-l-lg" : ""} ${index === 0 ? "row-span-3 rounded-t-lg justify-between flex-col" : ""}`}>

              <img src={item.image} alt="img" className={`object-cover ${index !== 0 ? "rounded-l-lg" : ""} w-72 ${index === 0 ? "object-cover rounded-t-lg basis-2/3 w-[700px]" : ""}`} />

              <div className={`flex items p-2 ${index === 0 ? "basis-1/3" : ""} flex-col justify-between`}> 
                    <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                     <img src={item.createdBy?.image} alt="" className="w-8 h-8 rounded-full object-cover"/>
                     <div className="flex flex-col">
                     <p className="text-[12px] text-slate-600">Written by</p>
                     <p className="text-[13px] font-semibold text-slate-800">{item.createdBy?.name}</p>
                     </div>
                     </div>
                     <p className="text-[12px] text-slate-400">{moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                      <h1 className="font-bold text-[18px]"onClick={() => {navigate(`/blog/${item._id}`)}}>{item.title}</h1>
                      <p className="text-slate-500 text-[13px]">{index === 0 && item.description?.length >= 350
                    ? item.description.slice(0, 350) + "..." 
                    : index >= 1 && item.description?.length >= 150
                    ? item.description.slice(0, 150) + "..."
                    : item.description + "..."}</p>
                    
              </div>
              
            </div>
          );
        })}



      </div>
    </>
  );
}

export default BlogLayout;
