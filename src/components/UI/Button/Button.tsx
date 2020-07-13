import React from 'react';

import classes from './Button.module.css';

interface ButtonInterface {
    btnType: string;
    clicked?:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | undefined;
    children: React.ReactNode;
    disabled?:boolean;
}




const button = (props:ButtonInterface) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;