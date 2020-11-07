import React,{Component} from "react";
import Aux from "../../hoc/auxilliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import {connect} from "react-redux";
import * as actionTypes from "../../store/actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 0.5,
  bacon: 0.5,
};

class BurgerBuilder extends Component {

  state={
    // ingredients: null,
    totalPrice:4,
    purchasable:false,
    purchasing:false,
    loading : false,   //if it is true and it means loading then show the spinner
    error : false
  };

  componentDidMount() {
    console.log(this.props);
    axios.get("https://burgerbuilder-67798.firebaseio.com/ingredients.json").then(
        response => {
          this.setState({ingredients: response.data});
        }
    ).catch(error => {
      this.setState({error:true});
    })
  }

  updatePerchaseState(ingredients){
    // const ingredients = {
    //   ...this.state.ingredients
    // };

    const sum = Object.keys(ingredients)
    .map(igkey => {
      return ingredients[igkey]
    })
    .reduce((sum,el) => {
      return sum+el;
    },0);
    // console.log(this.state.purchasable);
    this.setState({purchasable : sum > 0});
  }

  addHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    console.log(oldCount);
    const newCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    console.log(updatedIngredients);
    updatedIngredients[type] = newCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({totalPrice:newPrice , ingredients : updatedIngredients});
    this.updatePerchaseState(updatedIngredients);
  };


  removeHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    if(oldCount<=0){
      return;
    }
    console.log(oldCount);
    const newCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    console.log(updatedIngredients);
    updatedIngredients[type] = newCount;

    const pricededuction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - pricededuction;
    this.setState({totalPrice:newPrice , ingredients : updatedIngredients});
    this.updatePerchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing:true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing:false
    });
  };
  
  purchaseContinueHandler = () => {
  //   //alert("Done");
  //     this.props.history.push('/checkout'); //with this only the url gets changed so it will activate the route and rerender

      const queryParams = [];
      for (let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      }
      queryParams.push("price=" + this.state.totalPrice);  //to use in the contact data component passing
      const queryString = queryParams.join("&");

      this.props.history.push({
        pathname : "/checkout",
        search : "?" + queryString
      });

  };

  render() {

    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Oops Looks like Something went wrong</p> : <Spinner />;

    if(this.props.ings){
      burger = (
          <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                disabled={disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                purchasingNow={this.purchaseHandler}
            />
          </Aux>
      );
      orderSummary = (
          <OrderSummary
              price={this.state.totalPrice}
              ingredients={this.props.ings}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
          />);
    }
    //for showing until loading so loading is completed it will show what we want
    if(this.state.loading){
      orderSummary = <Spinner/>
    }

    // console.log(this.state.ingredients[]);

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
   return{
     ings : state.ingredients
   };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
