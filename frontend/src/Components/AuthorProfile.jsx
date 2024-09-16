import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function AuthorProfile() {

    const [ author, setAuthor ] = useState(null)
    const { authorId } = useParams();

    const fetchAuthor = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/get-author/${authorId}`, { withCredentials: true });
          console.log(response)
          setAuthor(response.data.author)
        } catch (error) {
          console.log(error)
        }
      };

    useEffect(() => {
        fetchAuthor();
      }, []);

  return (
    <div>
      Author
    </div>
  )
}

export default AuthorProfile
