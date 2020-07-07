import React, { ReactNode } from 'react';

import classes from './NavigationItem.module.css';

interface NavigationItemInterface {
    children: ReactNode;
    active?: boolean;
    link: string | undefined;
 
}

const navigationItem = (props:NavigationItemInterface) => (
    <li className={classes.NavigationItem}>
        <a 
            href={props.link}
            className={props.active ? classes.active : null}>{props.children}</a>
    </li>
    
);

export default navigationItem;