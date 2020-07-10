import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import { RouteComponentProps } from 'react-router';
import { BurgerType } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

interface ContactDataStateInterface {
    elementConfig: ElementConfigInterface;
    value: string;
    elementtype: string ;
    orderForm:OrderFormInterface;
    loading?:boolean;
    
}

interface OrderFormInterface{
    name:DataElementInterface;
    street:DataElementInterface;
    zipCode:DataElementInterface;
    country:DataElementInterface;
    email:DataElementInterface;
    deliveryMethod:DataElementInterface;
}

interface DataElementInterface {
    elementtype:string;
    elementConfig:ElementConfigInterface;
    value:string;
}
interface ElementConfigInterface {
    type?:string;
    placeholder?:string;
    options: Option[]
}
// interface ElementConfigDeliveryInterface {
//     options?:OptionsInterface[];
//     elementtype:string;
//     value:string
// }
export interface Option {
    value:string;
    displayValue:string;
}
interface contactData extends RouteComponentProps{
        price: number;
        ingredients: BurgerType;
        name?:string;
    }

// interface ContactDataStateInterface {
//     name?: string;
//     email?: string;
//     adrress?:{};
//     loading:boolean;
//     totalPrice?:number;
// }
 
// interface customerInterface{
//     name:allInterface;
//     street:allInterface;
//     zipCode:allInterface;
//     country:allInterface;
//     email:allInterface;
//     deliveryMethod:deliveryInterface;
// }

// interface allInterface{
//     value:string;
//     elementtype:string;
//     elementConfig:elementConfigInterface;
    
// }
// interface elementConfigInterface {
//     type:string;
//     placeholder:string;
    
// }

// interface deliveryInterface {
//     elementtype:string;
//     option:OptionInterface[];
//     value:string;
// }

// interface OptionInterface {
//     value:string;
//     displayValue:string;    
// };


// interface contactData extends RouteComponentProps{
//     price: number;
//     ingredients: BurgerType;
//     name?:string;
//     orderForm?: customerInterface;
// }

class ContactData extends Component <contactData, ContactDataStateInterface > {
    state = {
        orderForm:{
                name: {
                    elementtype: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                } as ContactDataStateInterface,
                street: {
                    elementtype: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                } as ContactDataStateInterface,
                zipCode: {
                    elementtype: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: ''
                } as ContactDataStateInterface,
                country: {
                    elementtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                }  as ContactDataStateInterface,
                email: {
                    elementtype: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: ''
                } as ContactDataStateInterface, 
                deliveryMethod:{
                    elementtype: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' }
                        ]
                    },
                    value: ''
                } as ContactDataStateInterface,
        },
        loading: false
    };

    orderHandler = (event: { preventDefault:() =>void})=> {
        event.preventDefault();
            this.setState( { loading: true } ); 
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }   
        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            })
        
    }

    render(){
        const formElementsArray = [];
        const newElementArrayState = {
            name: {} as ContactDataStateInterface,
            street: {} as ContactDataStateInterface,
            zipCode: {} as ContactDataStateInterface,
            country: {} as ContactDataStateInterface,
            email: {} as ContactDataStateInterface,
            deliveryMethod: {} as ContactDataStateInterface,
          };

          type NewKey = keyof typeof newElementArrayState;
            let key :NewKey
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key as keyof OrderFormInterface]
            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                    key={formElement.id} 
                    elementtype={formElement.config.elementtype}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}/>
                ))}
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
            
        )
    }

    
}

export default ContactData;
