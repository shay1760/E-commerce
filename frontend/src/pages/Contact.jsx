import React from 'react'
import {assets} from '../assets/assets'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'Contact'}text2={'Us'}/>
    </div>
    <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
      <img className='w-full md:max-w-[450px]' src={assets.contact} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl text-gray-600'>Our Store</p>
        <p>Shop no 214 Second Floor, Adidas, Quest Mall, 33,<br /> Syed Amir Ali Ave, Park Circus, Ballygunge, Kolkata, West Bengal 700017</p>
        <p className='text-gray-500'>Phone: (3314)569874 <br />Email: connorco@info.co.in</p>
        <p>Career</p>
        <p className='text-gray-500'>Know more</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
    </div>
    </div>
  )
}

export default Contact
