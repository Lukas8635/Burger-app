import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../UI/Button/Button';

interface OrderSummaryInterface {
    ingredients: { [index: string]: number };
    purchaseCancelled: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    purchaseContinued: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    price: number;
}

class OrderSummary extends Component<OrderSummaryInterface>{
    componentDidUpdate () {
        console.log('[OrderSummary] WillUpdate')
    }
 
    render (){
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
        </li>);
        });
        return(  <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
    <p><strong>Total Price: {this.props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>

        );
    }
} 

export default OrderSummary;
