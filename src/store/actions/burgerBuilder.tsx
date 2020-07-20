import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';



export const addIngredients = (name:string) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredients = (name:string) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return (dispatch: Function) => {
        axios.get('https://burger-my-app-good.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data));
        }) 
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    };
};

export const setIngredients = (ingredients:string ) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};