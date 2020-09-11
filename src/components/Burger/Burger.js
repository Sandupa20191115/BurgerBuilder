import React from 'react';
import classes from './Burger.module.css';
import Ingredient from './ingre/Ingredient';

const Burger = props => {
    let tranformedIngredients = Object.keys(props.ingredients)
         .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            // console.log(igKey);
            return <Ingredient key={igKey + i} type={igKey}/>
        });
    }).reduce((arr,el ) => {
        return arr.concat(el)
    } , []);

    if(tranformedIngredients.length === 0){
        tranformedIngredients = <p>Input Ingredients</p>
    }

    // console.log(Object.keys(props.ingredients));
    // console.log(tranformedIngredients);
    
    return(
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {tranformedIngredients}
            <Ingredient type="bread-bottum"/>
        </div>
    );
};

export default Burger;