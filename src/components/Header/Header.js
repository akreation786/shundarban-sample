import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Login/useAuth';

const usePrevious = value =>{
    const prev = useRef();
    useEffect(()=>{
        prev.current = value;
    },[value])
    return prev.current;
}


const Header = () => {
    const auth = useAuth();
    // console.log(auth);
    const [count, setCount] = useState(0);
    const previous = usePrevious(count);
    return (
        <div className="header">
            <h2>Previous: {previous}</h2>
            <h2>Count: {count}</h2>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
            <img src={logo} alt="Logo"/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Review</a>
                <a href="/inventory">Inventory</a>
                {
                    auth.user && <span style={{color: '#ddd'}}> Welcome <span style={{color: 'goldenrod'}}>{auth.user.Name}</span></span>
                }
                {
                    auth.user ? <a href= "/login">Sign Out </a>
                    : <a href= "/login">Sign In </a>
                }
            </nav>
        </div>
    );
};

export default Header;