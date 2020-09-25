import React from "react"
// import classes from "*.module.css";
import classes from './Backdrop.module.css';

const backDrop = (props) => (
    // console.log("esssssssssssssss");
    props.showorNot ? <div 
    className={classes.Backdrop}
    onClick={props.clicked}
    ></div> : null
);

// const backDrop = (props) => {
//     console.log("esssssssssssssss");
//     if(props.show)
//         return <div className={classes.Backdrop}></div>;
//     else
//         return null;
// };

export default backDrop;
