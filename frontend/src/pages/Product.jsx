import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {
  const {productId}=useParams();
      //console.log(productId)
  const {products, currency, addToCart}=useContext(ShopContext);
  const [productData, setProductData]=useState(false);
  const [image ,setImage]=useState('');
  const [size, setSize]=useState('');

  const fetchProductData=async()=>{
    products.map((item)=>{
      if(item._id===productId)
      {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  }, [productId])
  return productData ? ( 
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*product data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*product image*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index)=>(
                <img onClick={()=>setImage(item)} src={item} alt="" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-99 h-100'/>
          </div>
        </div>
        {/*product info*/}
        <div className='flex-1'>
          <h1 className='font-md text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star} alt="" className='w-3 5' />
            <img src={assets.star} alt="" className='w-3 5' />
            <img src={assets.star} alt="" className='w-3 5' />
            <img src={assets.star} alt="" className='w-3 5' />
            <img src={assets.star} alt="" className='w-3 5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col grap-4 my-8'>
            <p>Sizes</p>
            <div className='flex gap-3'>
              {productData.sizes.map((item, index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-200 ${item===size ? 'border-yellow-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-7 py-3 text-sm active:bg-gray-700'>Add to cart</button>
          <h2 className='mt-8 sm:w-4/5'></h2>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on delivery available</p>
            <p>7 days return and exhange policy</p>
          </div>
        </div>
      </div>
      {/*description & review*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>This product is made from at least 50% sustainable materials, using a blend of both recycled polyester and organic cotton fibres. The blend is at least 10% recycled fibres or at least 10% organic cotton fibres.</p>
        </div>
      </div>
      {/*related products*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}></RelatedProducts>
    </div>
  ): <div className='opacity-0'></div>
}
export default Product
