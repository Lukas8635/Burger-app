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
import { connect } from 'react-redux'; 
import * as actionTypes from '../../store/action';



 export interface AuxBurgerIngredienceInterface extends RouteComponentProps {
    label?: string;
    type?: string;
    totalPrice?: number;
    purchasing?: boolean;
    loading?: boolean;
    error?: boolean;
    ings:BurgerType;
    onIngredientAdded:Function ;
    onIngredientRemoved: Function;
    price:number;
    }
    
export interface BurgerBuilderState {
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
    [key: string]: number;
    price:number;
    
}
export interface BurgerType {
    [key:string]:number;
}

class BurgerBuilder extends Component <AuxBurgerIngredienceInterface>{
    state = {
        purchasing: false,
        loading: false,
        error:false,
    };

    componentDidMount(){
       
        // axios.get('https://burger-my-app-good.firebaseio.com/ingredients.json')
        //     .then(response =>{
        //         this.setState({ingredients: response.data});
        //     }) 
        //     .catch(error => {
        //         this.setState({error:true})
        //     })
    }

    updatePurchaseState (ingredients: { [x: string]: number; }){
          
        const sum = Object.keys( ingredients )
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0
    } 

    // addIngredientHandler = (type:keyof BurgerType) =>  {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount +1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type:keyof BurgerType) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount <= 0){
    //         return 
    //     }
    //     const updatedCount = oldCount -1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    puschaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=> {
       
        this.props.history.push('/checkout');

    }
    render(){
        const disabledInfo:{[key:string]: number|boolean} ={
            ...this.props.ings
            
        };
         
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =  null;
    
        let burger = this.state.error ? <p>Ingredients can't bee loaded!</p> : <Spinner/>;

        if(this.props.ings) {
            burger =  (
                <Auxiliary>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings) }/>
                </Auxiliary>);
            orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
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

 const mapStateToProps = (state:BurgerBuilderState) => {
     return{
         ings: state.ingredients,
         price:state.totalPrice
     }
 }

 const mapDispatchToProps = (dispatch:Function) =>{
    return{
        onIngredientAdded:(ingName: string) =>dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved:(ingName: string) =>dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
 }

 export default connect (mapStateToProps, mapDispatchToProps) (withErrorHandler( BurgerBuilder, axios )); 