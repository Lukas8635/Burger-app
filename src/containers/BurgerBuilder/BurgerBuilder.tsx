import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandrel';

const INGREDIENT_PRICES : BurgerType = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
} 

export interface BurgerType {
    [key:string]:any;
    
    
    
}


 export interface AuxBurgerIngredienceInterface {
    salad?:number;
    bacon?: number;
    cheese?:number;
    meat?:number;
    [x: string]:any;
    
    
}
 
interface BurgerBuilderState {
    ingredients:BurgerType;
    totalPrice:number;
    purchaseable?:boolean;
    purchasing?:boolean;
    loading: boolean;
    error?  : false,
    
}

class BurgerBuilder extends Component <AuxBurgerIngredienceInterface>{
    state: BurgerBuilderState = {
        ingredients: {},
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        

    };
    componentDidMount(){
        axios.get('https://burger-my-app-good.firebaseio.com/ingredients.json')
            .then(response =>{
                this.setState({ingredients: response.data});
            }) 
            .catch(error => {
                this.setState({error:true})
            })
    }

    updatePurchaseState (ingredients: { [x: string]: any; }){
          
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type:string) =>  {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type:string) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return 
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    puschaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=> {
        //alert ('You Continue!');
        this.setState( { loading: true } ); 
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Schwarzmuller',
                adress:{
                    street: 'Teststreet1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'Test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            })

    }
    render(){
        const disabledInfo ={
            ...this.state.ingredients
            
        };
        
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =  null;
    
        let burger = this.state.error ? <p>Ingredients can't bee loaded!</p> : <Spinner/>;

        if(this.state.ingredients) {
            burger =  (
                <Auxiliary>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchaseable}/>
                </Auxiliary>);
             orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.puschaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing}
                        modalClosed={this.puschaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
 }



 export default withErrorHandler ( BurgerBuilder, axios ); 