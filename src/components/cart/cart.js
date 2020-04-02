import React from 'react';


const Cart = (props) => {
   const cart = props.cart;

   // const user = useContext(UserContext )
   // console.log(user);

   const total = cart.reduce( (total, prd)=>(total + prd.price * prd.quantity),0); // not multiple quantity * prd.price

   const quantity = cart.reduce((quantity, qnt) => (quantity + qnt.quantity), 0);
   // let total = 0;
   // for(let i = 0; i<cart.length; i++){
   //    const product = cart[i];
   //    total = total + product.price * product.quantity;
   // }
   // console.log(prd.quantity);



   let shipping = 0;
   if(total > 0){
      shipping = 12
   }
   if(total > 200){
      shipping = 0
   }else if(total > 100){
      shipping = 5
   }
   const tax = (total / 10).toFixed(0);
   const grandTotal = (total + shipping + Number(tax)).toFixed(2);

   const formatNumber = num =>{
      const precision = num.toFixed(2);
      return Number(precision);
   }

   return (
      <div>
         <h2>Ordar Summary: {quantity} </h2>
         <h2>Product Price: {formatNumber(total)}</h2>
         <h4><small>Shipping Cost: {shipping}</small></h4>
         <h4>Tax + VAT : {tax}</h4>
         <h3>Total Amount: {grandTotal} </h3>
         {
            props.children
         }
      </div>
   );
};

export default Cart;