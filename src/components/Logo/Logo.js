import React from "react";
import logoBurger from '../../assets/Images/27.1 burger-logo.png.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={logoBurger} alt="logo png"/>
    </div>
);

export default  logo;