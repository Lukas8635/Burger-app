import {
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
} from '../actions/actionTypes'

import axios from '../../axios-orders';

import { Dispatch } from 'redux';
import { BurgerBuilderState } from '../../containers/BurgerBuilder/BurgerBuilder';


interface OrderActionInterface {
    price: number;
    ingredients: BurgerBuilderState;
    id: number;
}

export const purchasaBurgerSuccess = (id:string, orderData:string) =>{
    return{
        type:PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error:string) => {
    return{
        type: PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type:PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData:string) => {
    return (dispatch:Dispatch )=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then( (response)=> {
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
        type:PURCHASE_INIT
    };
}

export const fetchOrdersSuccess = (orders:OrderActionInterface[]) =>{
    return{
        type:FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error:string) =>{
    return{
        type:FETCH_ORDERS_FAIL ,
        error:error
    };
};

export const fetchOrderStart = () => {
    return {
        type: FETCH_ORDERS_START
    }
}

export const fetchOrders:Function = () => {
    return (dispatch:Dispatch) => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res =>{
                const fetchOrders = [];
                for (let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
                
            })
            .catch(err =>{
                dispatch(fetchOrdersFail(err))
            })
    }
}

 