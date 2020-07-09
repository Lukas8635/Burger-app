import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

export interface NavigationItemInterface {
    children: ReactNode;
    exact?:boolean;
    link: string ;
 
}

const navigationItem = (props:NavigationItemInterface) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
            >{props.children}</NavLink>
    </li>
    
);

export default navigationItem;