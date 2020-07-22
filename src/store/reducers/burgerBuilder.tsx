import { BurgerType,
         BurgerBuilderState} from '../../containers/BurgerBuilder/BurgerBuilder';
import { updateObject } from '../utility';
import { ActionTypes, 
        ADD_INGREDIENT, 
        REMOVE_INGREDIENT, 
        SET_INGREDIENTS, 
        FETCH_INGREDIENTS_FAILED,
        } from '../actions/actionTypes';
        

export interface BurgerBuilderReducerInterface {
    burgerBuilder: {
      ingredients: BurgerBuilderState;
      totalPrice: number;
      error: boolean;
    };
    order: {
      orders: [
        {
          price: number;
          ingredients: BurgerBuilderState;
          id: number;
        }
      ];
      loading: boolean;
      purchased: boolean;
    };
  }

interface BurgerBuilderReducerStateInterface {
    ingredients: ReducerIngredientsInterface;
    totalPrice: number;
    updatePurschaseState: any;
    error?: boolean;
}

interface ReducerIngredientsInterface{

    [key: string]: number;
}


const initialState = {
    ingredients: {} as BurgerType,
    totalPrice: 4 ,
    updatePurschaseState: false,
    error: false,
    

};

const INGREDIENT_PRICES= {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
} as BurgerBuilderState

const addIngredient = (
    state:BurgerBuilderReducerStateInterface,
     action:ActionTypes) =>{
    const updatedIngredient = { [action.ingredientName]:state.ingredients[action.ingredientName] + 1}
    const updatedIngredients= updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return  updateObject( state, updatedState);
}

const removeIngredient = (
    state:BurgerBuilderReducerStateInterface, 
    action:ActionTypes) => {
    const updatedIng = { [action.ingredientName]:state.ingredients[action.ingredientName] - 1}
    const updatedIngs= updateObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients:updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return  updateObject( state, updatedSt);
}

const setIngredients = (
    state:BurgerBuilderReducerStateInterface, 
    action:ActionTypes) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        error:false,
        totalPrice: 4
    });
}

const fetchIngredientsFailed = (
    state:BurgerBuilderReducerStateInterface=initialState, 
    action:ActionTypes) => {
    return updateObject(state , {error: true});
}
// reikia prie state nusirodyti initialState kad nedirbtu su tusciu  statu
const reducer = (state:BurgerBuilderReducerStateInterface =initialState, action:ActionTypes) =>{
    switch (action.type){
        case ADD_INGREDIENT: 
            return addIngredient(state, action);  

        case REMOVE_INGREDIENT: 
            return removeIngredient(state, action); 

        case SET_INGREDIENTS: 
            return setIngredients(state, action);  

        case FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);      
        default:return state;    
    } 
};

export default reducer;