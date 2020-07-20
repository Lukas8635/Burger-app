export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_INIT = 'PURCHASE_INIT';
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAIL = 'FETCH_ORDER_FAIL';



export interface AddIngredientInterface {
    type: typeof ADD_INGREDIENT;
}

export interface RemoveIngredientInterface {
    type: typeof REMOVE_INGREDIENT
}

export interface SetIngredientsInterface {
    type: typeof SET_INGREDIENTS
}

export interface FetchIngredientsFailedInterface {
    type: typeof FETCH_INGREDIENTS_FAILED
}

export interface PurchaseBurgerStartInterface {
    type: typeof PURCHASE_BURGER_SUCCESS;
    
}

export interface PurchaseBurgerSuccessInterface {
    orderData:string;
    orderId: number;
    type: typeof PURCHASE_BURGER_SUCCESS
}

export interface PurchaseBurgerFailInterface {
    type: typeof PURCHASE_BURGER_FAIL
}

export type test = PurchaseBurgerStartInterface | PurchaseBurgerSuccessInterface | PurchaseBurgerFailInterface
