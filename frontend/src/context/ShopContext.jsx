import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const deliveryFee = 40;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken]=useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);

        if(token){
            try {
                
                await axios.post(backendUrl+'/api/v1/cart/add', {itemId, size}, {headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((totalCount, sizes) => {
            return totalCount + Object.values(sizes).reduce((count, quantity) => count + quantity, 0);
        }, 0);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
                localStorage.setItem('products', JSON.stringify(response.data.products)); // Store in local storage
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch products. Please try again later.');
        }
    };

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts)); // Load from local storage if available
        } else {
            fetchProducts(); // Fetch from API if not available in local storage
        }
    }, []); // Add empty array to call once on mount

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        
        if(token){
            try {
                await axios.post(backendUrl+'/api/v1/cart/update', {itemId, size, quantity}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, sizes]) => {
            const itemInfo = products.find(product => product._id === itemId);
            const itemTotal = Object.entries(sizes).reduce((itemSum, [size, quantity]) => {
                if (quantity > 0 && itemInfo) {
                    return itemSum + itemInfo.price * quantity;
                }
                return itemSum;
            }, 0);
            return totalAmount + itemTotal;
        }, 0);
    };

    const getProductsData=async()=>{
        try {
            const response=await axios.get(backendUrl+'/api/v1/product/list')
            //console.log(response.data)
            if(response.data.success)
            {
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const userCart=async(token)=>{
        try {
            
            const response=await axios.post(backendUrl+'/api/v1/cart/get', {}, {headers:{token}})

            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)   
        }
    }

    useEffect(()=>{
        getProductsData()
    }, [])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            userCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, deliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
