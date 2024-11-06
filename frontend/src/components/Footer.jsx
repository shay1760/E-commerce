import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} alt="" className='mb-5 w-32' />
                <p className='w-full md:w-2/3 text-gray-600'>
                Connor&Co. is an Indian clothing brand redefining contemporary fashion. From smart casuals to bold streetwear, we bring you stylish, premium-quality apparel designed for the modern wardrobe. Explore our collections and make every outfit a statement.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Contact</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+3341 6865</li>
                    <li>connor@info.ac.in</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@connor.com All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer
