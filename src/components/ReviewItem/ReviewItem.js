import React from 'react';

const ReviewItem = (props) => {
   // console.log(props);
   const {name, img, quantity, key, price} = props.product;
   const reviewItemStyle = {
      borderBottom: '1px solid lightgrey',
      marginBottom:'5px',
      paddingBottom: '5px',
   }
   return (
      <div style={reviewItemStyle} className="review_item">
         <img src={img} alt=""/>
         <h2>{name}</h2>
         <h2>Quantity: {quantity}</h2>
         <p><small>Price: $ {price}</small></p>
         <br/>
         <button 
            className="main_button"
            onClick= {() => props.removeProduct(key)}
         >Remove</button>
      </div>
   );
};

export default ReviewItem;