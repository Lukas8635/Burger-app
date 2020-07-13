import React, { ReactNode, ChangeEventHandler } from 'react';
import classes from './Input.module.css';
import { ValidationInterface } from '../../../containers/Checkout/ContactData/ContactData'


interface InputInterface  {
    elementtype: string;
    label?: ReactNode;
    elementConfig:ElementConfigProps;
    value:string;
    name?:string; 
    changed:ChangeEventHandler;
    invalid: boolean;
    shouldValidate:ValidationInterface;
    touched:boolean;
}
export interface ElementConfigProps {
    type?:string;
    placeholder?:string;
    options?:Option[]
}
interface Option {
    value:string;
    displayValue:string;
    
    
    }

const input = (props:InputInterface) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

     if (props.invalid && props.shouldValidate && props.touched){
         inputClasses.push(classes.Invalid)
     }
    switch(props.elementtype){
        case  'input' :
            inputElement = <input className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value} 
            onChange={props.changed} />
            break;
        case 'textarea' :
            inputElement = <textarea className={inputClasses.join(' ')}
            {...props.elementConfig} 
            value={props.value} 
            onChange={props.changed} />
            break;
        case 'select' :
            inputElement = ( 
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value} 
                    onChange={props.changed}>
                        {props.elementConfig.options ? props.elementConfig.options.map(option =>(
                            <option 
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                            </option>
                        )) : null }
                </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
        
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;