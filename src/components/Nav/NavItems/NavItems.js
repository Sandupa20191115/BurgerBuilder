import React from "react";
import classes from './NavItems.module.css'
import NavItem from "./NavItem/NavItem";

const navItems = () => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact={true}>Burgur Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
    </ul>
);

export default navItems;
