import React, { useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'

import { savePaymentMethod } from '../Actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'

function Paymentscreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [paymentMethod,setPaymentMethod] = useState('paypal')

    if(!shippingAddress.address){
        history.push("/shipping")
    }

    function submitHandler(e){
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }

    const dispatch = useDispatch()
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <h3>Select Payment Method</h3>
                    <Form.Check
                        label="Paypal"
                        name="paymentMethod"
                        type= "radio"
                        value = "Paypal"
                        onChange= {(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                        label="Credit or Debit Card"
                        name="paymentMethod"
                        type= "radio"
                        value = "CCDC"
                        onChange= {(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                        label="Google Pay"
                        name="paymentMethod"
                        type= "radio"
                        value = "GooglePay"
                        onChange= {(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                        label="PayTM"
                        name="paymentMethod"
                        type= "radio"
                        value ="payTM"
                        onChange= {(e) => setPaymentMethod(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" onClick={submitHandler}>
                    Submit
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Paymentscreen
