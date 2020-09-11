import React, {Component} from 'react';
import Aux from '../../hoc/auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../Nav/Toolbar/Toolbar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer : true
    }

    sideDrawerCloseHandler = () => {
        this.setState(
            {
                showSideDrawer:false
            }
        );
    }

    sideDrawerOpenHandler = () => {
        this.setState(
            {
                showSideDrawer:true
            }
        );
    }

    render()
    {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerOpenHandler}/>
                <SideDrawer closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;

// const layout = (props) => (
//     <Aux>
//         <Toolbar/>
//         <SideDrawer/>
//         <main className={classes.content}>
//             {props.children}
//         </main>
//     </Aux>
// );
//
// export default layout;

