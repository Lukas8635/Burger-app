import React, { Component } from "react";
import { Route, RouteComponentProps, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerType } from '../../BurgerBuilder/BurgerBuilder';
import ContactData from './ContactData';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandrel';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import * as actions from '../../../store/actions/index';

interface CheckoutInterface extends RouteComponentProps {
    ings:BurgerType;
    totalPrice:number;
    onInitPurchase(): Function;
 
}

interface CheckoutStateInterface{
    order: any;
    burgerBuilder: any;
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
        let summary = <Redirect to="/"/>
        if (this.props.ings){
            const purchasedRedirect = this.props. purchased ?<Redirect to = "/" /> : null
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
const mapStateToProps = (state:CheckoutStateInterface ) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}



export default  connect (mapStateToProps) ( Checkout) ;