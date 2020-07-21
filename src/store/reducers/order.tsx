
import { updateObject } from '../utility';

import {
    ActionTypes,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from '../actions/actionTypes';


export interface ReducerStateInterface{
    orders: OrderPropsInterface[];
    loading:boolean;
    purchased: boolean;

}

interface OrderPropsInterface{}

const initialState ={
    orders: [],
    loading:false,
    purchased: false
};

const purchaseInit = (state: ReducerStateInterface, action:ActionTypes) =>{
    return updateObject(state, {purchased:false});
}

const purchaseBurgerStart = (state: ReducerStateInterface, action:ActionTypes) => {
    return updateObject( state, { loading:true});
}

const purchaseBurgerSuccess = (state: ReducerStateInterface, action:ActionTypes) => {
    const newOrder = updateObject(action.orderData, { in: action.orderId}) 
    return updateObject( state, {
        loading:false,
        purchased: true,
        orders:state.orders.concat(newOrder)
    });
}

const purchaseBurgerFail = (state: ReducerStateInterface, action:ActionTypes) => {
    return updateObject(state, { loading:false});
}

const fetchOrderStart = (state: ReducerStateInterface, action:ActionTypes) => {
    return updateObject(state, { loading:true});
} 

const fetchOrderSuccess = (state: ReducerStateInterface, action:ActionTypes) => {
    return  updateObject(state, {
        orders: action.orders,
       loading: false
   } );
}

const fetchOrderFail = (state: ReducerStateInterface, action:ActionTypes) => {
    return updateObject (state, { loading: false}); 
}
// reikia prie state nusirodyti initialState kad nedirbtu su tusciu  statu
const reducer = (state: ReducerStateInterface = initialState,
    action: ActionTypes) =>{
    switch(action.type){
        case PURCHASE_INIT: return purchaseInit(state, action);  
        case PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);           
        case PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);       
        case PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case FETCH_ORDERS_START: return fetchOrderStart(state, action);  
        case FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);   
        case FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);  
        default: return state;
    }
}

export default reducer;