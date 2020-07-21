import { BurgerBuilderState } from '../../containers/BurgerBuilder/BurgerBuilder';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_INIT = 'PURCHASE_INIT';

export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';



export interface AddIngredientInterface extends OtherInterface {
    type: typeof ADD_INGREDIENT;
    ingredients: BurgerBuilderState;
}

export interface RemoveIngredientInterface extends OtherInterface {
    type: typeof REMOVE_INGREDIENT;
    ingredients: BurgerBuilderState;
}

export interface SetIngredientsInterface extends OtherInterface {
    type: typeof SET_INGREDIENTS;
    ingredients: BurgerBuilderState;
}

export interface FetchIngredientsFailedInterface extends OtherInterface {
    type: typeof FETCH_INGREDIENTS_FAILED;
    ingredients: BurgerBuilderState;
}

export interface PurchaseBurgerStartInterface extends OtherInterface {
    type: typeof PURCHASE_BURGER_START;
    ingredients: BurgerBuilderState;
    
}

export interface PurchaseBurgerSuccessInterface extends OtherInterface{
    type: typeof PURCHASE_BURGER_SUCCESS;
    ingredients: BurgerBuilderState;
}

export interface PurchaseBurgerFailInterface extends OtherInterface {
    type: typeof PURCHASE_BURGER_FAIL;
    ingredients: BurgerBuilderState;
}

export interface PurchaseInitInterface extends OtherInterface {
    type: typeof PURCHASE_INIT;
    ingredients: BurgerBuilderState;
    purchased: boolean;
}

export interface FetchOrdersStart extends OtherInterface{
    type: typeof FETCH_ORDERS_START;
    ingredients: BurgerBuilderState;
}

export interface FetchOrdersSuccess extends OtherInterface{
    type: typeof FETCH_ORDERS_SUCCESS;
    ingredients: BurgerBuilderState;
}

export interface FetchOrdersFail extends OtherInterface{
    type: typeof FETCH_ORDERS_FAIL;
    ingredients: BurgerBuilderState;
}

interface OtherInterface {
    orderData: string;
    order: string;
    orderId: string;
    ingredientName: string;
    orders: [];
}




export type ActionTypes = 
| AddIngredientInterface
| RemoveIngredientInterface
| SetIngredientsInterface
| FetchIngredientsFailedInterface
| PurchaseBurgerStartInterface
| PurchaseBurgerSuccessInterface
| PurchaseBurgerFailInterface
| PurchaseInitInterface
| FetchOrdersStart
| FetchOrdersSuccess
| FetchOrdersFail



