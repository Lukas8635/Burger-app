import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

export interface LayoutInterface {
    children: React.ReactNode ;
    
}

interface LayoutState {
    showSideDrawer: boolean;
}

class Layout  extends Component <LayoutInterface, LayoutState>{
    state = {
        showSideDrawer: false// visada apsirasius state , reikia apsirasyti ir interface jam
   }
    sideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer:false})
    }   
    sideDrawerToggleHandler = () => {
         this.setState((prevState) => { 
           return {showSideDrawer: !prevState.showSideDrawer};
         });
    }

    render(){
        return (
        <Auxiliary>
            <Toolbar drawerToggleClicked ={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        )
    }

}


export default Layout;