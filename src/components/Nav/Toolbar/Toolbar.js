import React from "react";
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from "../NavItems/NavItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.clicked}/>
        {/*<div clicked={props.clicked}>Menus</div>*/}
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems/>
        </nav>
    </header>
);

export default toolBar;