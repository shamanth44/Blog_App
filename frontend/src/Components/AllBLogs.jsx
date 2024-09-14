import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import BlogLayout from './BlogLayout';
import Blogs from '../pages/Blogs';
import CategoryButtons from './CategoryButtons';

function AllBLogs() {

const blogsRes = useSelector((state)=> state.blogs)
const recentBlogs = useSelector((state)=> state.blogs.recentBlogs)

const blogs = blogsRes.blogs
  return (
    <div className='mt-5'> 
      {recentBlogs.isLoading ? <p>Loading...</p> : 
      <BlogLayout blog={recentBlogs} /> }
      <CategoryButtons/>
      <div className='flex flex-wrap px-20 justify-between mt-20 gap-y-10'>
        {blogsRes.isLoading ? <p>Loading...</p> : 
      blogs.length >= 1 ? 
        blogs.map((blog, index)=>{
          return(
            <Blogs key={index} blog={blog} />
          )
        }) : <p className='text-[32px] font-semibold'>{blogsRes.error.message}</p>}
      
      </div>
    </div>
  )
}

export default AllBLogs
