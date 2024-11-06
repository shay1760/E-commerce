import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>Hassle-free exhange policy</p>
      </div>
      <div>
        <img src={assets.quality} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Best Quality</p>
        <p className='text-gray-400'>Where Style Meets Superior Craftsmanship</p>
      </div>
      <div>
        <img src={assets.support} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>24/7 Customer support</p>
        <p className='text-gray-400'>Support Around the Clock, Whenever You Need It.</p>
      </div>
    </div>
  )
}

export default OurPolicy
