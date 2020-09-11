import React from "react";
import logoBurger from '../../assets/Images/27.1 burger-logo.png.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height : props.height}}>
        <img src={logoBurger} alt="logo png"/>
    </div>
);

export default  logo;