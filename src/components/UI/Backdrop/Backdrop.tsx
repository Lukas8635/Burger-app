import React from 'react';
import classes from './Backdrop.module.css';
import { ModalInterface } from '../Modal/Modal';

const backdrop = (props:ModalInterface) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;