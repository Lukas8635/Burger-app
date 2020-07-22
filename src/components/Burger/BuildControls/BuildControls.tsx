import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';



interface BuildControlsInterface{
    ordered: (event: React.MouseEvent<HTMLButtonElement>) => void;
    //argumentai kurie ateina i funkcija
    ingredientAdded: Function;
    ingredientRemoved: Function;
    //
    disabled: { [key: string]: number | boolean }
    price: number; 
    purchasable: boolean;
    key?: string;
    label?: string;
    type?: string;
    
    

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
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;