import React from "react";
import Burger from "../../Burger/Burger";
import CustomButton from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>Hope It Is Good</h1>
        <div style={{width:"100%",height:"300px",margin:"auto"}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <CustomButton btnType="Danger" clicked={props.checkoutCanceled}>Cancel</CustomButton>
        <CustomButton btnType="Success" clicked={props.checkoutContinued}>Continue</CustomButton>
    </div>
);

export default checkoutSummary;