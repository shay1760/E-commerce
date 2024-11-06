import dropdown from './dropdown.png'
import hero from './hero.png'
import menu from './menu.png'
import logo from './logo.png'
import search from './search.png'
import cart from './shopping-bag.png'
import user from './user.png'
import p1_img1 from './p1_img1.png'
import p1_img2 from './p1_img2.jpg'
import p1_img3 from './p1_img3.png'
import p1_img4 from './p1_img4.png'
import p1_img5 from './p1_img5.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'
import img5 from './img5.png'
import exchange from './exchange.png'
import quality from './quality.png'
import support from './support.png'
import close from './close.png'
import star from './star.png'
import bin from './bin.png'
import razorpay from './razorpay.png'
import icon from './icon.jpeg'
import about from './About.png'
import contact from './contact.png'

export const assets = {
    dropdown,
    logo,
    hero,
    menu,
    search,
    cart,
    user,
    exchange,
    quality,
    support,
    close,
    star,
    bin,
    razorpay,
    icon,
    about,
    contact
}

export const products = [
    {
        _id: "product1",
        name: "Nike Sportsware Tech Fleece",
        description: "Women's High-Waisted Pleated Trousers",
        price: 87,
        image: [p1_img1, p1_img2, p1_img3, p1_img4, p1_img5],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        _id: "product2",
        name: "Nike Sportsware Phoenix Fleece",
        description: "Women's Oversized Pullover Hoodie",
        price: 95,
        image: [img2],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        _id: "product3",
        name: "ZW Collection Crochet Top",
        description: "",
        price: 59,
        image: [img3],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        _id: "product4",
        name: "Maroon Slim Fit Corduroy Shirt",
        description: "",
        price: 15,
        image: [img4],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        _id: "product5",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "",
        price: 19,
        image: [img5],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: false
    },
]
