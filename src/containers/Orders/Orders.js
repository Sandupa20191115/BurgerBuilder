import React,{Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component{

    state = {
        orders : [],
        loading : true
    };

    //here I want to make the js obj I got back from the server to an obj

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            console.log(res.data);
            const fetchedOrder = []; //array to store the converted obj to an arr
            for(let key in res.data){
                fetchedOrder.push(
                    {
                        ...res.data[key],
                        id : key
                    });
            }
            this.setState({loading : false,orders : fetchedOrder});
        }).catch(err => {
            this.setState({loading : false});
        });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
                ))}
                {/*<Order/>*/}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);