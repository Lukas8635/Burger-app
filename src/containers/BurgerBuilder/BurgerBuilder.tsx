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
import * as actions from '../../store/actions/index';
import { BurgerBuilderReducerInterface } from '../../store/reducers/burgerBuilder';

export interface AuxBurgerIngredienceInterface extends RouteComponentProps {
    label?: string;
    type?: string;
    totalPrice?: number;
    purchasing?: boolean;
    loading?: boolean;
    error?: boolean;
    ings:BurgerType;
    onIngredientAdded: () => void ;
    onIngredientRemoved:  () => void;
    onInitIngredients: () => void;
    price:number;
    onInitPurchase: () => void
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

class BurgerBuilder extends Component <AuxBurgerIngredienceInterface>{
    state = {
        purchasing: false,
        
        
    };

    componentDidMount(){
       
       this.props.onInitIngredients()
      
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

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    puschaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=> {
       this.props.onInitPurchase();
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
    
        let burger = this.props.error ? <p>Ingredients can't bee loaded!</p> : <Spinner/>;

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
}
 const mapStateToProps = (state:BurgerBuilderReducerInterface) => {
     return{
         ings: state.burgerBuilder.ingredients,
         price: state.burgerBuilder.totalPrice,
         error: state.burgerBuilder.error
     }
 }

 const mapDispatchToProps = (dispatch:Function) =>{
    return{
        onIngredientAdded:(ingName: string) =>dispatch(actions.addIngredients(ingName)),
        onIngredientRemoved:(ingName: string) =>dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
 }


export default connect (mapStateToProps, mapDispatchToProps) (withErrorHandler( BurgerBuilder, axios )); 