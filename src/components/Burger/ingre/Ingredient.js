import React, { Component } from 'react';
import classes from './Ingredient.module.css';
import PropTypes from 'prop-types';

class Ingredient extends Component {

    render(){
        let ingre = null;
        switch(this.props.type){
            case('bread-bottum'):
                ingre = <div className={classes.BreadBottom}></div>;
                break;
            case('bread-top'):
                ingre = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
            break;
            case('meat'):
                ingre = <div className={classes.Meat}></div>;
                break;
            case('cheese'):
                ingre = <div className={classes.Cheese}></div>;
                break;
            case('salad'):
                ingre = <div className={classes.Salad}></div>;
                break;
            case('bacon'):
                ingre = <div className={classes.Bacon}></div>;
                break;
            default:
                ingre = null;
        }
        return ingre;
    }
};


Ingredient.propTypes = {
    type : PropTypes.string.isRequired
};

// const ingredient = (props) => {
//     let ingredient = null;
//     switch(props.type){
//         case('bread-bottum'):
//             ingredient = <div className={classes.BreadBottom}></div>;
//             break;
//         case('bread-top'):
//             ingredient = (
//                 <div className={classes.BreadTop}>
//                     <div className={classes.Seeds1}></div>
//                     <div className={classes.Seeds2}></div>
//                 </div>
//             );
//         break;
//         case('meat'):
//             ingredient = <div className={classes.Meat}></div>;
//             break;
//         case('cheese'):
//             ingredient = <div className={classes.Cheese}></div>;
//             break;
//         case('salad'):
//             ingredient = <div className={classes.Salad}></div>;
//             break;
//         case('bacon'):
//             ingredient = <div className={classes.Bacon}></div>;
//             break;
//         default:
//             ingredient = null;
//     }
//     return ingredient;
// };

export default Ingredient;