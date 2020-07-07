import React from 'react';
import classes from './DrawerToggle.module.css';

 
interface DrawerToggleInterface {
    clicked:(event: React.MouseEvent<HTMLElement>) => void;
}

const drawerToggle = (props:DrawerToggleInterface) => (
    <div className={classes.DrawerToggle} 
    onClick={props.clicked}> 
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;