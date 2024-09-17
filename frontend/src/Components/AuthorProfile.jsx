import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Blogs from '../pages/Blogs';
import { useSelector } from 'react-redux';

function AuthorProfile() {

    const [ author, setAuthor ] = useState([])
    const { authorId } = useParams();

    const blogsRes = useSelector((state)=> state.blogs)
const blogs = blogsRes.blogs


    const fetchAuthor = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/get-author/${authorId}`, { withCredentials: true });
          setAuthor(response.data.author)
        } catch (error) {
          console.log(error)
        }
      };

    useEffect(() => {
        fetchAuthor();
      }, []);

      console.log(author)

  return (
    <div className='px-20 flex justify-between border-b-[1px]'>
      {/* left */}
      <div className='flex flex-col items-center basis-1/4 sticky top-20 h-screen'>
      <img src={author.image} alt="" className='w-[100px] h-[100px] object-cover rounded-full' />
      <h1>{author.name}</h1>
      <h1>{author.name}</h1>
      <h1>{author.name}</h1>
      <h1>{author.name}</h1>
      <h1>{author.name}</h1>
      <h1>{author.name}</h1>
      <h1>{author.name}</h1>
      <h1>{author.name}</h1>
      </div>
<div className='w-[1px] bg-gray-300'></div>
      {/* right */}
      <div className='basis-3/5'>
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

    </div>
  )
}

export default AuthorProfile
