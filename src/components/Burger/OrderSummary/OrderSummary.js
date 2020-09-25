import React from "react";
import Aux from "../../../hoc/auxilliary";
import ButtonOwn from '../../UI/Button/Button';

const orderSummary = (props) => {

  const inredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return <li key={igKey}> <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]} </li>;
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger : </p>
      <ul>
          {inredientSummary}
      </ul>
  <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
      <p>Checkout Now ? </p>
      <ButtonOwn btnType="Danger" clicked={props.purchaseCanceled}>Cancel</ButtonOwn>
      <ButtonOwn btnType="Success" clicked={props.purchaseContinue}>Continue</ButtonOwn>
    </Aux>
  );
};

export default orderSummary;
