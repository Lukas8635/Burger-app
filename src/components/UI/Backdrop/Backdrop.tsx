import React from 'react';
import classes from './Backdrop.module.css';


interface BackdropInterface {
    clicked:(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    show: boolean | undefined | string;
}

const backdrop = (props:BackdropInterface) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;