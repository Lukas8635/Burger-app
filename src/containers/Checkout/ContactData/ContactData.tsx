import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import { RouteComponentProps } from 'react-router';
import { BurgerType } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


interface ContactDataInterface {
    name: string;
    email: string;
    adrress:{};
    loading:boolean;
    totalPrice?:number;
    


  
}
 
interface contactData extends RouteComponentProps{
    price: number;
    ingredients: BurgerType;
    
}


class ContactData extends Component <contactData, ContactDataInterface >{
    state = {
        name: '',
        email:'',
        adrress:{
            street:'',
            postalCode:''
        },
    loading: false
    }
    orderHandler = (event: { preventDefault:() =>void})=> {
        event.preventDefault();
            this.setState( { loading: true } ); 
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmuller',
                adress:{
                    street: 'Teststreet1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'Test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
        
         
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name='name' placeholder='Your Name'/>
                <input className={classes.Input} type="email" name='email' placeholder='Your email'/>
                <input className={classes.Input} type="text" name='street' placeholder='Street'/>
                <input className={classes.Input} type="text" name='postal' placeholder='Postal Code'/>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading){
            form = <Spinner/> 
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
            
        );
    }

}

export default ContactData;
