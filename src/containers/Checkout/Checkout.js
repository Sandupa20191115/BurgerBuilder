import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component{

    state = {
        ingredients : {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 2
        },
        totalPrice : 0
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            //finding the totalPrice
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = param[1];
            }
        }

        this.setState({ingredients:ingredients,totalPrice:price});
    }


    checkoutCancledHanlder = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCancledHanlder}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path+ "/contact-data"}
                    component={(props) => (<ContactData
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        {...props}
                        />
                        )}/>
            </div>
        );
    }
}

export default Checkout;