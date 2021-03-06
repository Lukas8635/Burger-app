import React from 'react';


import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {BurgerType} from '../../containers/BurgerBuilder/BurgerBuilder'

export interface BurgerInterface {
    ingredients: BurgerType ;
    
}


const burger = (props:BurgerInterface) => {
    
    let transformIngredients = Object.keys(props.ingredients)
    .map(ingredientKey =>{
        return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
            console.log(props.ingredients[ingredientKey])
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey}/>;
            
        });
    })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if(transformIngredients.length === 0){
        transformIngredients = [<p key={1}>Please start adding ingredients!</p>];

    }
    console.log(transformIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
           {transformIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};  

export default  burger ; 