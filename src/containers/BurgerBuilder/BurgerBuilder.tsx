import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandrel';
import { RouteComponentProps } from 'react-router-dom';
import { WriteStream } from 'tty';



 export interface AuxBurgerIngredienceInterface extends RouteComponentProps {
    ingredients: BurgerType;
      label?: string;
      type?: string;
      totalPrice: number;
      purchasing: boolean;
      loading: boolean;
      error: boolean;
    }
    
export interface BurgerBuilderState {
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
    [key: string]: number;
    
}
export interface BurgerType {
    [key:string]:number;
  
}


const INGREDIENT_PRICES : BurgerBuilderState = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
} 

class BurgerBuilder extends Component <AuxBurgerIngredienceInterface>{
    state = {
        ingredients: {} as BurgerType,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error:false,
        

    };
    componentDidMount(){
        console.log(this.props);
        axios.get('https://burger-my-app-good.firebaseio.com/ingredients.json')
            .then(response =>{
                this.setState({ingredients: response.data});
            }) 
            .catch(error => {
                this.setState({error:true})
            })
    }

    updatePurchaseState (ingredients: { [x: string]: number; }){
          
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type:keyof BurgerType) =>  {
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

    removeIngredientHandler = (type:keyof BurgerType) => {
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
    
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' +  this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search:'?' + queryString
        });

    }
    render(){
        const disabledInfo:{[key:string]: number|boolean} ={
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
             orderSummary =  <OrderSummary 
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