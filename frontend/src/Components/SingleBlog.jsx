import React from 'react'
import { useParams } from 'react-router-dom';


function SingleBlog() {
    const { id } = useParams();
    console.log(id)
  return (
    <div>
      
    </div>
  )
}

export default SingleBlog
