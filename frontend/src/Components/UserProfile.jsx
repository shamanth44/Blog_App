import React from 'react'
import { useSelector } from 'react-redux'

function UserProfile() {

const user = useSelector((state)=> state.auth.user.user)
console.log(user)


  return (
    <div className='mt-20 px-16 flex flex-col gap-3'>
      <img src={user.image} alt="" className='object-cover h-[300px] w-[300px] rounded-lg'/>
      <h1 className='text-3xl font-extrabold'>{user.name}</h1>
    </div>
  )
}

export default UserProfile