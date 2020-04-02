import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
   const [cart, setCart] = useState([]);
   const [orderPlaced, setOrderPlaced] = useState(false);
   const auth = useAuth();

   const handlePlaceOrder = () => {
      processOrder();
      setOrderPlaced(true);
      setCart([]);
   }

   const removeProduct = (productKey) => {
      const newCart = cart.filter(pd => pd.key !== productKey);
      setCart(newCart);
      removeFromDatabaseCart(productKey);
   };
   useEffect(()=>{
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      const cartProducts = productKeys.map(key => {
         const product = fakeData.find(pd => pd.key === key);
         product.quantity = savedCart[key];
         return product;
      });
      setCart(cartProducts);
   },[]);

   let thankyou;
   if(orderPlaced){
      thankyou = <img src={happyImage} alt="" />
   }

   return (
        <div className="shop_container">
            <div className="product_container">
               {
                  cart.map(pd => <ReviewItem 
                     key = {pd.key}
                     removeProduct = {removeProduct}
                     product={pd} ></ReviewItem>)
               }
               { thankyou }
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