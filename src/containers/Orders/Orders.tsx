import React, { Component } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandrel';
import { BurgerBuilderState } from '../BurgerBuilder/BurgerBuilder'
interface OrderStateInterface {
    orders:[
        {
            price: number ;
            ingredients: BurgerBuilderState;
            id: number;
        }
    ];
    loading: boolean;
    
}


class Orders extends Component <OrderStateInterface>{
    state={
        orders:[],
        loading: true,
        

    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res =>{
                const fetchOrders = [];
                for (let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading:false, orders: fetchOrders});
            })
            .catch(err =>{
                this.setState({loading:false});
            })

    }
    render (){
        return(
            <div>
                {this.state.orders.map(
                    (order: {
                        id: number;
                        price: number;
                        ingredients: BurgerBuilderState;
          }) =>(
                    <Order key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}/> 
                ))}
            </div>
        );
    }
}

export default withErrorHandler( Orders, axios) ;