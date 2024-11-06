import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { products } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'; // Ensure this component is imported

const RelatedProducts = ({ category, subCategory }) => {
  const { product } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      
      setRelated(productsCopy.slice(0, 5));
    }
  }, [category, subCategory]); // Add category and subCategory as dependencies

  return (
    <div>
      <div className='my-24'>
        <div className='text-center text-3xl py-2'>
          <Title text1='Related' text2={`${category}`} /> {/* Adjusted text2 prop */}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
          {related.map((item, index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts;
