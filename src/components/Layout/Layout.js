import React from 'react';
import Aux from '../../hoc/auxilliary';
import classes from './Layout.module.css';

const Layout = (props) => (
    <Aux>
        <div>Toolbar,SideDrawer,Backdro</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

// const Layout = (props) => { 
//    return  (
//     <Aux>
//         <div>Toolbar,SideDrawer,Backdro</div>
//         <main className={classes.content}>
//             {props.children}
//         </main>
//     </Aux>
//     );
// }; 

export default Layout;

