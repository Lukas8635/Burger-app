import React, { Component } from "react";
import { Route, RouteComponentProps } from 'react-router-dom'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerType } from '../../BurgerBuilder/BurgerBuilder';
import ContactData from './ContactData';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandrel';
import { connect } from 'react-redux';

interface CheckoutInterface extends RouteComponentProps {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
    ings:BurgerType;
    totalPrice:number;
}

interface CheckoutStateInterface{
    totalPrice:number;
    ingredients:string;
}

class Checkout extends Component <CheckoutInterface> {
  
    checkoutCancelledHandler= () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
      }
    }
const mapStateToProps = (state:CheckoutStateInterface ) =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

export default  connect (mapStateToProps) (withErrorHandler( Checkout , axios)) ;