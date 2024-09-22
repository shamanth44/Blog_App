import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='mb-10 px-5 md:px-16'>
      <div className="relative">
        <img src={"https://res.cloudinary.com/shamanth-ganiger/image/upload/v1727007183/thought-catalog-505eectW54k-unsplash_c8jtsq.jpg"} alt="" className="h-[50vh] sm:h-[88vh] w-full object-cover rounded-2xl" loading="lazy" />
        <div className='absolute inset-0 bg-black opacity-10 rounded-2xl'></div>
        <div className='absolute px-5 sm:px-20 flex items-end bottom-10 right-10 xl:right-20 sm:w-2/3 sm:bottom-28 gap-4 flex-col'>
          <span className='text-white text-xl text-end sm:text-3xl font-extrabold'>Your words have the power to change the world. Start sharing your story today.</span>
          <Link to={"/signup"} className='bg-white rounded-lg px-3 py-2 text-sm sm:text-base text-black'>Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
