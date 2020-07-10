import React, { ReactNode } from 'react';
import classes from './Input.module.css';


interface InputInterface  {
    elementtype?: string;
    label?: ReactNode;
    elementConfig:ElementConfigProps;
    value?:string;
    name?:string; 
}
interface ElementConfigProps {
    type?:string;
    placeholder?:string;
    options:options[];
}
interface options{
    value: string;
    displayValue:string;
}

interface selectInterface {
    value: string;
    displayValue:string;
}


const input = (props:InputInterface) => {
    let inputElement = null;
    switch(props.elementtype){
        case  'input' :
            inputElement = <input className={classes.InputElement}
            {...props.elementConfig}
            value={props.value} />
            break;
        case 'textarea' :
            inputElement = <textarea className={classes.InputElement}
            {...props.elementConfig} 
            value={props.value} />
            break;
        case 'select' :
            inputElement = ( 
                <select 
                    className={classes.InputElement}
                    value={props.value}>
                        {props.elementConfig.options.map((option =>(
                            <option 
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                            </option>
                        ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={classes.InputElement}
            {...props.elementConfig}
            value={props.value} />
        
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;