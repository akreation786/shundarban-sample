import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props.product)
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div className="">
                <img src={img} alt=""/>
            </div>
            <div className="product_name">
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <br/>
                <p><small>Only {stock} left in stock - order soon</small></p>
                { props.showAddToCart && <button 
                    className="main_button" 
                    onClick={() => props.handleAddProduct(props.product)}>
                        <FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;