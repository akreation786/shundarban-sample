import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { UserContext } from '../../App';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

const usePrevious = value =>{
    const prev = useRef();
    useEffect(()=>{
        console.log(value);
        prev.current = value;
    },[value])
    return prev.current;
}


const Header = () => {
    const user = useContext(UserContext)
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
                <a href="/manage">Manage Inventory Here</a>
                <span style={{color: 'goldenrod'}}>{user}</span>
            </nav>
        </div>
    );
};

export default Header;