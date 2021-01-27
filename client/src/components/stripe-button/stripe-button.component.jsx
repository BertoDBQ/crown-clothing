import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ( { price }) => {
    // stripe wants the value in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_diK4kkRxGf36lg8UrL6FKbEC';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('Payment Successful');
            console.log('payment successful');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please use the correct credit card');
        });
    }

    return (
       <StripeCheckout
            label="Pay Now"
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLable='Pay Now'
            token={onToken}
            stripeKey={publishableKey}   
       /> 
    )
};

export default StripeCheckoutButton;