import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';
import { useSelector } from 'react-redux';
import BlogLayout from './BlogLayout';
import Blogs from '../pages/Blogs';

function AllBLogs() {

const dispatch = useDispatch();

const blogs = useSelector((state)=> state.blogs.blogs)
console.log(blogs)

  useEffect(()=>{
    dispatch(getBlogs());
  },[])

  return (
    <div> 
      <BlogLayout blog={blogs}  />

      <div className='flex flex-wrap px-20 justify-between mt-20 gap-y-10'>
      {blogs !== null ? blogs.map((blog, index)=>{
        return(
            <Blogs key={index} blog={blog} />
        )
      }) : <h1>Loading</h1>}
      </div>
    </div>
  )
}

export default AllBLogs
