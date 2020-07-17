import React, { Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import { RouteComponentProps } from 'react-router';
import { BurgerType } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';


interface ContactDataStateInterface {
    orderForm:OrderFormInterface;
    loading?:boolean;
    formIsValid?:boolean; 
    }

interface DataElementInterface {
    elementtype:string;
    elementConfig:ElementConfigProps;
    value:string;
    validation:ValidationInterface;
    valid?:boolean;
    touched:boolean;
    }

export interface ValidationInterface{
    required: boolean;
    minLenght?: number;
    maxLenght?:number;
}

    interface ElementConfigProps {
        type?:string;
        placeholder?:string;
        options?:Option[];
    }

 interface Option {
    value:string;
    displayValue:string;
    
    
    }

interface contactData extends RouteComponentProps{
    price: number;
    ingredients: BurgerType;
    name?:string;
    totalPrice?:number;
    }

interface OrderFormInterface{
    name:DataElementInterface;
    street:DataElementInterface;
    zipCode:DataElementInterface;
    country:DataElementInterface;
    email:DataElementInterface;
    deliveryMethod:DataElementInterface;
    }
interface ContactDataMapStateInterface{
    ingredients: string;
    totalPrice: number;
}


class ContactData extends Component <contactData, ContactDataStateInterface> {
    state = {
        orderForm:{
                name: {
                    elementtype: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false,

                } as DataElementInterface,
                street: {
                    elementtype: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false,
                } as DataElementInterface ,
                zipCode: {
                    elementtype: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minLenght:5,
                        maxLenght:5
                    },
                    valid:false,
                    touched: false,
                } as DataElementInterface ,
                country: {
                    elementtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false,
                } as DataElementInterface ,
                email: {
                    elementtype: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false, 
                } as DataElementInterface , 
                deliveryMethod:{
                    elementtype: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' },
                        ],
                    },
                    value: 'fastest',
                    valid:true,
                    validation:{}
                } as DataElementInterface ,
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const names = {
            name: {} as DataElementInterface,
            street: {} as DataElementInterface,
            zipCode: {} as DataElementInterface,
            country: {} as DataElementInterface,
            email: {} as DataElementInterface,
            deliveryMethod: {} as DataElementInterface,
        }
            // this.setState( { loading: true } ); 
        const formData: { [element: string]: string } = {};
        type Names = keyof typeof names;
        let key: Names;

        for (key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
          }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        }   
        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            })
        
    };
    checkValidity(value: string, rules: ValidationInterface ) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLenght){
            isValid = value.length >= rules.minLenght  && isValid;
        }
        if (rules.maxLenght){
            isValid = value.length <= rules.maxLenght  && isValid;
        }
        return isValid;

    }

    inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, inputIdentifier: any) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier as keyof OrderFormInterface]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier as keyof OrderFormInterface] = updatedFormElement;

        const names2 = {
            name: {} as DataElementInterface,
            street: {} as DataElementInterface,
            zipCode: {} as DataElementInterface,
            country: {} as DataElementInterface,
            email: {} as DataElementInterface,
            deliveryMethod: {} as DataElementInterface,
        }
        
        let formIsValid:boolean | undefined = true;
        type Names2 = keyof typeof names2;
        let key2:Names2
        for(key2 in updatedOrderForm){
            formIsValid = updatedOrderForm[key2].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid});
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
        for(key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key as keyof OrderFormInterface]
            });
        }
        let form = (
            <form  onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                    key={formElement.id} 
                    elementtype={formElement.config.elementtype}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event: React.ChangeEvent<HTMLInputElement> ) => 
                        this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
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

const mapStateToProps = (state:ContactDataMapStateInterface) =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect (mapStateToProps)  (ContactData);
