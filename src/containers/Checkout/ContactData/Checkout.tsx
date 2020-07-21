import React, { Component } from "react";
import { Route, RouteComponentProps, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerType } from '../../BurgerBuilder/BurgerBuilder';
import ContactData from './ContactData';
import { connect } from 'react-redux';
import { BurgerBuilderReducerInterface } from '../../../store/reducers/burgerBuilder'


interface CheckoutStateInterface extends RouteComponentProps{
    salad:number;
    bacon:number;
    cheese:number;
    meat:number;
    ings:BurgerType
    onInitPurchase(): ()=> void;
    purchased:boolean;
   
}

class Checkout extends Component <CheckoutStateInterface> {

  
    checkoutCancelledHandler= () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/"/>
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ?<Redirect to = "/" /> : null
            summary = (

                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary
      }
    }
const mapStateToProps = (state:BurgerBuilderReducerInterface ) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}



export default  connect (mapStateToProps) ( Checkout) ;