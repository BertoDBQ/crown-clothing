import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ( { price }) => {
    // stripe wants the value in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_diK4kkRxGf36lg8UrL6FKbEC';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
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