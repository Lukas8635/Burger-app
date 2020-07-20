import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { test } from './actionTypes';
import { Dispatch } from 'redux';

export const purchasaBurgerSuccess = (id:number, orderData:string) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error:string) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData:string) => {
    return (dispatch:Dispatch )=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then( (response: { data: number; })=> {
            console.log(response.data)
           dispatch(purchasaBurgerSuccess(response.data.name, orderData))
        })
        .catch((error:string) => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersSuccess = (orders) =>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) =>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL ,
        error:error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return (dispatch:Dispatch) => {
        axios.get('/orders.json')
            .then(res =>{
                const fetchOrders = [];
                for (let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders))
                this.setState({loading:false, orders: fetchOrders});
            })
            .catch(err =>{
                this.setState({loading:false});
            })
    }
}

 