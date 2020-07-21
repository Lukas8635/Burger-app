import {
    ActionTypes,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
} from '../actions/actionTypes'
import axios from '../../axios-orders';
import {  ThunkAction } from 'redux-thunk';
import { Action } from 'redux';




export const addIngredients = (name:string) => {
    return {
        type:ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredients = (name:string) => {
    return {
        type:REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () : ThunkAction <void, undefined, undefined, Action> => {
    return (dispatch) => {
        axios.get('https://burger-my-app-good.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data));
        }) 
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    };
};

export const setIngredients = (ingredients:ActionTypes ) =>{
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    };
};