import * as actionTypes from '../actions/actionTypes';
import reducer from './burgerBuilder';
//   

const initialState ={
    orders: [],
    loading:false,
    purchased: false
};

const redurec = (state = initialState, action:any) =>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            };

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading:false,
                purchased: true,
                orders:state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:false
            };
        default:
            return state;
    }
}

export default reducer;