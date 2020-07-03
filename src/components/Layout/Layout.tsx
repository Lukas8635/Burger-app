import React from 'react';


import Auxiliary from '../../hoc/Auxiliary';

export interface LayoutInterface {
    children: React.ReactNode ;

}

const layout = (props:LayoutInterface)=> (
    <Auxiliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Auxiliary>
    
);



export default layout;