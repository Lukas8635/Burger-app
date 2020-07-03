import React from 'react';


import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';



interface BuildControlsInterface{
    ingredientAdded(type: string): void;
    ingredientRemoved(type:string):void;
    disabled: any;
    price:number; 
    purchasable?:boolean;
   

};

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}

];

const buildControls = (props:BuildControlsInterface) => (
    <div className= {classes.BuildControls}>
        <p>Currernt Price: <strong>{props.price.toFixed(2)}</strong>$</p>
        {controls.map(ctrl => (
            <BuildControl 
            key ={ctrl.label} 
            label={ctrl.label}
           
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled ={props.disabled[ctrl.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;