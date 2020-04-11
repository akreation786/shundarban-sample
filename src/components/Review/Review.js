import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
   const [cart, setCart] = useState([]);
   const auth = useAuth();


   const removeProduct = (productKey) => {
      const newCart = cart.filter(pd => pd.key !== productKey);
      setCart(newCart);
      removeFromDatabaseCart(productKey);
   };
   useEffect(()=>{
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      console.log(productKeys);
      fetch('http://localhost:4000/getProductsByKey', {
         method: 'POST', 
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(productKeys) 
       })
      .then(res => res.json())
      .then(data => {
         console.log(data);
         const cartProducts = productKeys.map(key => {
            const product = data.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
         });
         setCart(cartProducts);
      })
   },[]);


   return (
        <div className="shop_container">
            <div className="product_container">
               {
                  cart.map(pd => <ReviewItem 
                     key = {pd.key}
                     removeProduct = {removeProduct}
                     product={pd} ></ReviewItem>)
               }
               {
                  !cart.length && <h2>Your Cart is Empty, <a href="/shop">Keep Shipping</a></h2>
               }
            </div>
            <div className="cart_container">
               <Cart cart={cart}>
                  <Link to="/Shipment">
                     {  
                        auth.user?
                        <button  className="main_button">Proceed CheckOut</button>
                        :
                        <button  className="main_button">Login to Proceed</button>

                     }
                  </Link>
               </Cart>
            </div>

         </div>
   );
};

export default Review;