import React from 'react';
import { useForm } from 'react-hook-form';
import '../../components/Shipment/Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
   const { register, handleSubmit, errors } = useForm();
   const auth = useAuth();
   const onSubmit = data => {
    // TODO: riaz move this after payment
    const saveCart = getDatabaseCart();
    const orderDetails = {email:auth.user.email, cart: saveCart};
      fetch('http://localhost:4000/placeOrder', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails) 
      })
      .then(res => res.json())
      .then(data =>{
        alert('Successfuly Placed Your order with order Id: ' + data._id)
        processOrder();
      })
   }
    // console.log(auth.user.Name);
  //  console.log(watch('example')) // watch input value by passing the name of it
 
   return (
     
     <form onSubmit={handleSubmit(onSubmit)} className="ship_form">
       <input name="name" defaultValue={auth.user.Name} ref={register({ required: true })} placeholder="Your Name" />
       {errors.name && <span className="error">Name is required</span>}
       <input name="email"defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Enter Email" />
       {errors.email && <span> className="error"Email is required</span>}
       <input name="addressLIne1" ref={register({ required: true })} placeholder="Address Line 1" />
       {errors.addressLIne1 && <span className="error">address LIne 1 is required</span>}
       <input name="addressLIne2" ref={register({ required: true })} placeholder="Address Line 2" />
       {errors.addressLIne2 && <span className="error">address LIne 2 is required</span>}
       <input name="city" ref={register({ required: true })} placeholder="City" />
       {errors.city && <span className="error">City is required</span>}
       <input name="country" ref={register({ required: true })} placeholder="Country" />
       {errors.country && <span className="error">Country is required</span>}
       <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
       {errors.zipcode && <span className="error">Zip Code is required</span>}
       
       <input type="submit" />
     </form>
   )
};

export default Shipment;