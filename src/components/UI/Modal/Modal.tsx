import React, { ReactNode, Component } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

export interface ModalInterface {
    modalClosed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: React.ReactNode;
    show: boolean |string | undefined;
}

class Modal extends Component<ModalInterface>{
    shouldComponentUpdate(nextProps: {
        show: boolean | undefined | string;
        children: React.ReactNode;
      }) {
        return (
          nextProps.show !== this.props.show ||
          nextProps.children !== this.props.children
        );
      }
    render () {
        return (<Auxiliary>
            <Backdrop show={this.props.show}
            clicked={this.props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' :'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </Auxiliary>)
    }
}

export default Modal;
  