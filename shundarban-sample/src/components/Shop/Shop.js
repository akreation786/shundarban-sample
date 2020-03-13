import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/product';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [Products, setProducts] = useState(first10)
    const [cart, setCart] = useState([])

    const handleAddProduct = (product) => {
        console.log('product added', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop_container">
            <div className="product_container">
                {
                    Products.map(singleProduct => <Product
                        handleAddProduct = {handleAddProduct}
                        product={singleProduct}
                        ></Product>)
                }
            </div>
            <div className="cart_container">
                <h3>this is cart</h3>
            <h4>Order Summary: {cart.length}</h4>
            </div>

        </div>
    );
};

export default Shop;