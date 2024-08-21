import React from 'react'
import { Link } from 'react-router-dom'
const PagesNotFound = () => {
  return (
    <div className='text-black text-center p-3 font-500 text-[14px] leading-24px'>
      404,Page Not Found<br/>
      PLease goto Home Page.<br/>
      <Link to="/"><button className="p-3 text-white bg-black font-500 text-[14px] leading-24px rounded-md w-44 self-center mt-4">GoTo Home</button></Link>
    </div>
  )
}

export default PagesNotFound
