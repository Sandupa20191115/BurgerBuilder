import React from "react";
import classes from './Input.module.css';

const input = (props) => {

    const inputClasses = [];
    let inputElement = null;

    if(props.invalid){
        inputClasses.push(classes.Invalid);
    }

    switch (props.inputType) {
        case ('input') :
            inputElement = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                onChange={props.changed}/>;
            break;
        case ('textarea') :
            inputElement = <textarea
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                onChange={props.changed}/>;
            break;
        case ('select') :
            inputElement = (<select
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed} >
                {props.elementConfig.options.map(eachOption => (
                    <option value={eachOption.value}>{eachOption.displayValue}</option>
                ))}
            </select>);
            break;
        // default :
        //     inputElement = <input  {...props.elementConfig} />;
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;