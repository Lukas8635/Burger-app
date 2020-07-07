import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems'; 
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

interface SideDrawerInterface{
    open?: boolean | undefined;
    closed: () => void;
    


}
 
const sideDrawer = (props:SideDrawerInterface) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return(
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                
                <nav>
                <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;