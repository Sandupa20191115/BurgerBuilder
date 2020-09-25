import React,{Component} from "react";
import Aux from "../../hoc/auxilliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 0.5,
  bacon: 0.5,
};

class BurgerBuilder extends Component {

  state={
    ingredients: null,
    totalPrice:4,
    purchasable:false,
    purchasing:false,
    loading : false,   //if it is true and it means loading then show the spinner
    error : false
  };

  componentDidMount() {
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
    //alert("Done");

    this.setState({
      loading : true
    });

    const orderObj = {
      ingredients: this.state.ingredients,
      price : this.state.totalPrice,
      custom : {
        name : "Yello",
        address : {
          stret : "Green",
          city : "colors"
        }
      }
    };

    axios.post('/orders.json',orderObj)
        .then( response => {
          this.setState({loading : false ,purchasing : false});
        })
        .catch( error => {
          this.setState({loading : false ,purchasing : false});
        });    //orders is my name for the node
  };

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Oops Looks like Something went wrong</p> : <Spinner />;

    if(this.state.ingredients){
      burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded={this.addHandler}
                ingredientRemoved = {this.removeHandler}
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
              ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder,axios);