import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import BlogLayout from './BlogLayout';
import Blogs from '../pages/Blogs';
import CategoryButtons from './CategoryButtons';
import Landing from './Landing';

function AllBLogs() {

const blogsRes = useSelector((state)=> state.blogs)
const recentBlogs = useSelector((state)=> state.blogs.recentBlogs)
const { isAuthenticated } =  useSelector((state) => state.auth)


const blogs = blogsRes.blogs
  return (
    <div className='mt-5'> 
    {!isAuthenticated && <Landing/>}
      {recentBlogs.isLoading ? <p>Loading...</p> : 
      <BlogLayout blog={recentBlogs} /> }
      <CategoryButtons/>
      <div className='px-5 md:px-16 mt-20 grid justify-center grid-cols-[repeat(auto-fit,_minmax(250px,_310px))] gap-10'>
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
