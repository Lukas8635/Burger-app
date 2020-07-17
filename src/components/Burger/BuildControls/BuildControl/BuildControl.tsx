import React from 'react';
import classes from './BuildControl.module.css';


export interface BuildControlInterface {
    //grazina objekta
    added: (event: React.MouseEvent<HTMLButtonElement>) => void;
  removed: (event: React.MouseEvent<HTMLButtonElement>) => {};
  disabled?: boolean | number;
  purchasable?: boolean;
  type?: string;
  key: string;
  label: string;
}

const buildControl = (props:BuildControlInterface) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled === true ? props.disabled: false}>Less</button>
        <button className={classes.More}
        onClick={props.added}>More</button>
    </div>
);

export default buildControl;