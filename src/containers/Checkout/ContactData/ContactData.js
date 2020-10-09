import React, {Component} from "react";
import Custombutton from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axiosOrders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import CustomInput from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: " ",
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 10
                },
                valid : false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street Name"
                },
                value: " ",
                validation : {
                    required : true
                },
                valid : false
            },
            city: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "City"
                },
                value: " ",
                validation : {
                    required : true
                },
                valid : false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: " ",
                validation : {
                    required : true
                },
                valid : false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: " ",
                validation : {
                    required : true
                },
                valid : false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                value: " "
            }
        },
        loading: false
    };

    orderHandler = (event) => {

        event.preventDefault(); //refreshes the page after client stuff
        this.setState({
            loading: true
        });

        const formData = {};
        for (let formIdentifier in this.state.orderForm){
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
        }

        const orderObj = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData : formData
        };

        axios.post('/orders.json', orderObj)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });    //orders is my name for the node

        console.log(this.props.ingredients);
    };

    checkValidity(value,rules){

        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    changedHandler = (event, inputIdentifier) => {
        console.log("onchangedhandler activated");
        const updatedFormdata = {...this.state.orderForm};
        const updatedFormElement = {...updatedFormdata[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormdata[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedFormdata});
        console.log(updatedFormElement)
        // console.log(updatedFormElement.value);
    };

    render() {

        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(eachformElement => (
                    <CustomInput
                        key={eachformElement.id}
                        inputType={eachformElement.config.elementType}
                        elementConfig={eachformElement.config.elementConfig}
                        value={eachformElement.config.value}
                        invalid={!eachformElement.config.valid}
                        changed={(event) => this.changedHandler(event, eachformElement.id)}
                    />
                ))}
                <Custombutton btnType="Success">Order</Custombutton>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h2>Enter Details</h2>
                {form}
            </div>
        );
    }
}


export default ContactData;
//
// import React, { Component } from 'react';
//
// import Button from '../../../components/UI/Button/Button';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import classes from './ContactData.module.css';
// import axios from '../../../axiosOrders';
// import Input from '../../../components/UI/Input/Input';
//
// class ContactData extends Component {
//     state = {
//         orderForm: {
//             name: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'Your Name'
//                 },
//                 value: ''
//             },
//             street: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'Street'
//                 },
//                 value: ''
//             },
//             zipCode: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'ZIP Code'
//                 },
//                 value: ''
//             },
//             country: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'Country'
//                 },
//                 value: ''
//             },
//             email: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'email',
//                     placeholder: 'Your E-Mail'
//                 },
//                 value: ''
//             },
//             deliveryMethod: {
//                 elementType: 'select',
//                 elementConfig: {
//                     options: [
//                         {value: 'fastest', displayValue: 'Fastest'},
//                         {value: 'cheapest', displayValue: 'Cheapest'}
//                     ]
//                 },
//                 value: ''
//             }
//         },
//         loading: false
//     }
//
//     orderHandler = ( event ) => {
//         event.preventDefault();
//         this.setState( { loading: true } );
//         const formData = {};
//         for (let formElementIdentifier in this.state.orderForm) {
//             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
//         }
//         const order = {
//             ingredients: this.props.ingredients,
//             price: this.props.price,
//             orderData: formData
//         }
//         axios.post( '/orders.json', order )
//             .then( response => {
//                 this.setState( { loading: false } );
//                 this.props.history.push( '/' );
//             } )
//             .catch( error => {
//                 this.setState( { loading: false } );
//             } );
//     }
//
//     inputChangedHandler = (event, inputIdentifier) => {
//         const updatedOrderForm = {
//             ...this.state.orderForm
//         };
//         const updatedFormElement = {
//             ...updatedOrderForm[inputIdentifier]
//         };
//         updatedFormElement.value = event.target.value;
//         updatedOrderForm[inputIdentifier] = updatedFormElement;
//         this.setState({orderForm: updatedOrderForm});
//     }
//
//     render () {
//         const formElementsArray = [];
//         for (let key in this.state.orderForm) {
//             formElementsArray.push({
//                 id: key,
//                 config: this.state.orderForm[key]
//             });
//         }
//         let form = (
//             <form onSubmit={this.orderHandler}>
//                 {formElementsArray.map(formElement => (
//                     <Input
//                         key={formElement.id}
//                         elementType={formElement.config.elementType}
//                         elementConfig={formElement.config.elementConfig}
//                         value={formElement.config.value}
//                         changed={(event) => this.inputChangedHandler(event, formElement.id)} />
//                 ))}
//                 <Button btnType="Success">ORDER</Button>
//             </form>
//         );
//         if ( this.state.loading ) {
//             form = <Spinner />;
//         }
//         return (
//             <div className={classes.ContactData}>
//                 <h4>Enter your Contact Data</h4>
//                 {form}
//             </div>
//         );
//     }
// }
//
// export default ContactData;