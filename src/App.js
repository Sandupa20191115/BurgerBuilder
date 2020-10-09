import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/burgerbuilder/burgerbuilder';
import Checkout from "./containers/Checkout/Checkout";
import {Route,Switch} from "react-router-dom";
import Orders from "./containers/Orders/Orders";

class App extends Component{

    render(){
    return(
      <div>
        <Layout>
            <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/orders" exact component={Orders} />
            </Switch>
            {/*<BurgerBuilder/>*/}
            {/*<Checkout />*/}
        </Layout>
      </div>
    );
  }
}

export default App;
