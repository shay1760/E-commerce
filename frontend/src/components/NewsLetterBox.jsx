import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler=()=>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-800 mt-3'>
        Unlock exclusive benefits, tailored just for you!
        </p>
        <form action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
            <button type='submut' className='text-white text-sx px-10 py-4 bg-black'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
