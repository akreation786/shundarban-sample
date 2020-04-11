import React, { useState } from 'react';
import './Shop.css';
import Product from '../Product/product';
import Cart from '../cart/cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            console.log(products);
        })
    })

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(products);
        if(products.length > 0){
            const previousCart = productKeys.map(existingKey =>{
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(previousCart);
        }
    },[products])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop_container">
            <div className="product_container">
                {
                    products.map(singleProduct => <Product
                        key={singleProduct.key}
                        showAddToCart={true} //from 25.5 - 09:33 
                        handleAddProduct = {handleAddProduct}
                        product={singleProduct}
                        ></Product>)
                }
            </div>
            <div className="cart_container">
                <Cart cart={cart} >
                    <Link to="/review">
                        <button className="main_button">Review Order</button>         
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;