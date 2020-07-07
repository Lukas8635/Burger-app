import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

interface LogoInterface {
    height?  :string | undefined

}

const logo =(props:LogoInterface) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Burger Logo"/>
    </div>
);

export default logo;
