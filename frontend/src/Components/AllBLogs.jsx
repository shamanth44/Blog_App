import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';
import { useSelector } from 'react-redux';
import BlogLayout from './BlogLayout';
import Blogs from '../pages/Blogs';

function AllBLogs() {

const dispatch = useDispatch();

const blogs = useSelector((state)=> state.blogs.blogs)

  useEffect(()=>{
    dispatch(getBlogs());
  },[])

  return (
    <div> 
      <BlogLayout blog={blogs}  />

      <div className='flex flex-wrap px-20 justify-between mt-20 gap-y-10'>
      {blogs.length !== 0 ? blogs.map((blog, index)=>{
        return(
            <Blogs key={index} blog={blog} />
        )
      }) : <p className='text-[32px] font-semibold'>Loading</p>}
      </div>
    </div>
  )
}

export default AllBLogs
