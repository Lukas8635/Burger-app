import React from 'react';
import { ModalInterface } from '../Modal/Modal'
import classes from './Button.module.css';




const button = (props:ModalInterface) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;