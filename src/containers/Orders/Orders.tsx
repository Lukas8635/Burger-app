import React, { Component, Dispatch } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandrel';
import { BurgerBuilderState } from '../BurgerBuilder/BurgerBuilder'
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { BurgerBuilderReducerInterface } from '../../store/reducers/burgerBuilder';


export interface OrdersInterface {
    orders: [
        {
            price:string;
            ingredients:BurgerBuilderState;
            id:number;
        }
    ];
    loading: boolean;
    onFetchOrders:() => void;
}


// interface OrderInterface {
//     price: string ;
//     ingredients: BurgerBuilderState;
//     id: number;
// }

// interface OrderInterface{
//     loading: boolean;
//     orders:OrderInterface[];
//     onFetchOrders:Function;
// }

class Orders extends Component<OrdersInterface>{



    componentDidMount(){
        this.props.onFetchOrders();
    }
    
    render (){
    let orders = [<Spinner />];
        if (!this.props.loading){
            orders=
                this.props.orders.map<JSX.Element>(
                (order) =>(
                <Order key={order.id}
                price={order.price}
                ingredients={order.ingredients}/> 
            ) )
            
        }
        return(
            <div>
               {orders}
            </div>
        );
    }
}

const mapStateToProps = (state: BurgerBuilderReducerInterface) => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
} 

const mapDispatchToProps = (dispatch:Dispatch<any>) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
}

export default connect (mapStateToProps, mapDispatchToProps) (withErrorHandler( Orders, axios)) ;  