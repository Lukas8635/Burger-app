import React from 'react';
import classes from './Order.module.css'
import { BurgerBuilderState } from '../../containers/BurgerBuilder/BurgerBuilder';

interface OrderInterface {
    price:string;
    ingredients:BurgerBuilderState;
}


const order = (props:OrderInterface)=> (
    <div className={classes.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
);

export default order;