import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/product';
import { useState } from 'react';

const ProductDetail = () => {
   const {productKey} = useParams();
   const [product, setProduct] = useState(null);
   useEffect (() => {
      fetch('http://localhost:4000/products/'+productKey)
      .then(res => res.json())
      .then(data => {
         setProduct(data);
         console.log(data);
      })
   }, [productKey]);


   return (
      <div>
         <h2>Your Product Details</h2>
         {
            product && <Product showAddToCart={false} product={product}></Product>
         }
      </div>
   );
};

export default ProductDetail;