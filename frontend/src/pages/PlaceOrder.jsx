import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CardTotal from '../components/CardTotal'
import { assets, products } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setMethod]=useState('COD');

  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryFee, products}=useContext(ShopContext)
  const [formData, setFormData]=useState({
    firstName:'',
    lastName:'', 
    email:'',
    houseNo:'',
    street:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
    phone:''
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name
    const value=event.target.value

    setFormData(data=>({...data, [name]:value}))
  }

  const onSubmitHandler=async(event)=>{
      event.preventDefault()
      try {
        let orderItems=[]
        for(const items in cartItems){
          for(const item in cartItems[items])
          {
            if(cartItems[items][item]>0)
            {
              const itemInfo=structuredClone(products.find(product=>product._id===items))
              if(itemInfo)
              {
                itemInfo.size=item
                itemInfo.quantity=cartItems[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }
        //console.log(orderItems)

        let orderData={
          address: formData,
          items: orderItems,
          amount: getCartAmount()+deliveryFee
        }

        switch(method){
          case 'COD':
            //console.log('Submitting order:', orderData);
            const response = await axios.post(backendUrl + '/api/v1/order/place', orderData, { headers: { token } });
            //console.log('Response received:', response);
            if(response.data.success){
              setCartItems({})
              navigate('/orders')
            }else{
              toast.error(response.data.message)
            }
            break;

          case 'stripe':
            const responseStripe=await axios.post(backendUrl+'/api/v1/order/stripe', orderData, {headers:{token}})
            console.log(orderData)
            if(responseStripe.data.success){
              const {session_url}=responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
            
            break;
          default:
            break;
        }
      } catch (error) {
        //console.log(error)
        //toast.error(error.message)
      }
  }

  //const {navigate} = useContext(ShopContext)

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
    {/* left side */}
    <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
      <div className='text-xl sm:text-2xl my-3'>
        <Title text1={'Delivery'} text2={'Information'}></Title>
      </div>
      <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
      </div>
      <div className='flex gap-3'>
      <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Mobile number' />
      </div>
      <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />
      <input required onChange={onChangeHandler} name='houseNo' value={formData.houseNo} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Flat, House no., Building, Apartment' />
      <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
      <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
            <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
            <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='PinCode' />
            <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='country' />
      </div>
      
    </div>
    {/*right side*/}
    <div className='mt-8'>
        <div className='mt-8 min-w-8'>
          <CardTotal/>
        </div>
        <div className="mt-12">
          <Title text1={'Payment'} text2={'Method'}/>
          <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400' : ''}`}></p>
                <img className='h-10 mx-4' src={assets.icon} alt="" />
              </div>
              <div onClick={()=>setMethod('COD')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='COD'?'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium px-4'>Cash on delivery</p>
              </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder