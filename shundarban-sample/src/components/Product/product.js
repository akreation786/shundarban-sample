import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './product.css';

const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className="product">
            <div className="">
                <img src={img} alt=""/>
            </div>
            <div className="product_name">
                <h4>{name}</h4>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <br/>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button 
                    className="main_button" 
                    onClick={() => props.handleAddProduct(props.product)}>
                        <FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>
        </div>
    );
};

export default Product;