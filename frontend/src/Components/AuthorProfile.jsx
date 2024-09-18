import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Blogs from '../pages/Blogs';
import { useSelector } from 'react-redux';

function AuthorProfile() {

    const [ author, setAuthor ] = useState([])
    const [ loading, setLoading] = useState(true)
    const [ detail, setDeatil  ] = useState('home')
    const { authorId } = useParams();

    const handleItemClick = (item) => {
      setDeatil(item);
    };

    const blogsRes = useSelector((state)=> state.blogs)
    const blogs = blogsRes.blogs

    const fetchAuthor = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/get-author/${authorId}`, { withCredentials: true });
          setAuthor(response.data.author)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      };

    useEffect(() => {
        fetchAuthor();
      }, []);

      console.log(author)

  return (
    <div>
      {!loading ? 
    <div className='px-20 flex justify-between border-b-[1px]'>
      {/* left */}
      <div className='flex flex-col gap-2 basis-1/4 sticky top-20 h-screen'>
      <img src={author.image} alt="" className='w-[100px] h-[100px] object-cover rounded-full' />
      <p className=''>{author.name}</p>
      <p className='text-gray-500'>1456 Followers</p>
      </div>
<div className='w-[1px] bg-gray-300'></div>
      {/* right */}
      <div className='basis-4/6 flex flex-col gap-10 py-10'>
      <div className=''>
        <h1 className='text-4xl text-gray-800 font-semibold'>{author.name}</h1>
      </div>
      <div className='border-b-[1.7px] flex gap-6 pb-2'>
        <button className={`${detail === "home" ? "text-black underline underline-offset-[14.5px]" : "text-gray-400"} tracking-wider`} onClick={() => handleItemClick('home')} >Home</button>
        <button className={`${detail === "about" ? "text-black underline underline-offset-[14.5px]" : "text-gray-400"} tracking-wider`} onClick={() => handleItemClick('about')} >About</button>
      </div>

      <div>
        {detail === "home" && author.blogs.length !== 0 ? author.blogs.map((blog, index)=> {
          return(
            <p key={index}>{blog.title}</p>
          )
        }) : detail === "home" && <p>No blogs found</p>}
        {detail === "about" && <p>About</p>}
      </div>

      <div className='flex flex-wrap justify-between gap-y-10'>
        {blogsRes.isLoading ? <p>Loading...</p> : 
      blogs.length >= 1 ? 
      blogs.map((blog, index)=>{
        return(
          <Blogs key={index} blog={blog} />
        )
      }) : <p className='text-[32px] font-semibold'>{blogsRes.error.message}</p>}
      
      </div>
      </div>

    </div>  : <p>Loading...</p>}
      </div>
  )
}

export default AuthorProfile
