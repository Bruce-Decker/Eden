import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PaymentRequestButtonElement,
    injectStripe,
    StripeProvider,
    Elements,
} from 'react-stripe-elements';
import './Payment.css';
import {toast} from "react-toastify";

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Open Sans, sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#c23d4b',
            },
        }
    }
};

class StripePayment extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.stripePaymentButtonElement = null;

        const paymentRequest = props.stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Demo total',
                amount: 1000,
            },
            // Requesting the payer’s name, email, or phone is optional, but recommended.
            // It also results in collecting their billing address for Apple Pay.
            requestPayerName: true,
            requestPayerEmail: true,
        });

        paymentRequest.on('token', ({complete, token, ...data}) => {
            props.handleResult({paymentRequest: {token, data}});
            complete('success');
        });

        paymentRequest.canMakePayment().then((result) => {
            this.setState({canMakePayment: !!result});
        });

        this.state = {
            canMakePayment: false,
            paymentRequest,
            amount: 0,
            billingAddress: {},
            shippingAddress: {},
            stripeToken: {},
            navigate: {}
        };
    }

    state = {
        errorMessage: '',
    };

    handleChange = ({error}) => {
        this.stripePaymentButtonElement.disabled = false;
        if (error) {
            this.setState({errorMessage: error.message});
        }
        else {
            this.setState({errorMessage: ''});
        }
    };

    async submit(ev) {
        // User clicked submit
        this.stripePaymentButtonElement.disabled = true;
        var stripeToken = {};
        ev.preventDefault();
        if (this.props.stripe) {
            stripeToken = await this.props.stripe.createToken(this.state.billingAddress)
                .then((data) => {
                    stripeToken = data.token;
                    return stripeToken;
                })
                .then(this.props.handleResult)
                .catch(err => this.setState({errorMessage: err.message}));
            //console.log(stripeToken);
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
        this.setState({stripeToken: stripeToken});
        if(typeof stripeToken === 'undefined'){
            this.setState({errorMessage: "check the payment information and try again"})
        }
        else {
            const charge_details = {
                amount: this.state.amount,
                description: "sample charge",
                stripe_token: stripeToken.id,
                email: sessionStorage.getItem('email')
            };

            const paymentResponse = await axios.post('/payment/charge', charge_details)
              .then(res => {
                  console.log("payment successfull!");
                  return {'order_id': res.data.order._id, 'payment_receipt_url': res.data.receipt_url};
              })
              .catch(err => {
                  this.setState({errorMessage: "Payment Failed! Try again"});
                  return err;
              });
            //console.log(paymentResponse);

            var shipment_details = {
                shipTo: {
                    name: this.state.shippingAddress.name,
                    street1: this.state.shippingAddress.address_line1,
                    street2: this.state.shippingAddress.address_line2,
                    city: this.state.shippingAddress.address_city,
                    state: this.state.shippingAddress.address_state,
                    postalCode: this.state.shippingAddress.address_zip,
                    country: this.state.shippingAddress.address_country
                },
                carrierCode: "fedex"
            };
            var shipping_info = await axios.post('/shipment/create_label', shipment_details)
              .then(async res => {
                  console.log("Shipment label created successful!");
                  return res.data;
              })
              .catch(err => {
                  return err;
              });

            var order_updated_data = {
                orderId: paymentResponse.order_id,
                paymentReceiptUrl: paymentResponse.payment_receipt_url,
                trackingId: shipping_info.trackingNumber,
                carrierCode: shipping_info.carrierCode
            };

            await axios.post('/order/addPostChargeInfo', order_updated_data)
              .then(res => {
                  console.log("Order updated successfull!");
                  //window.location.href = '/paymentConfirmation?order_id=' + sessionStorage.getItem('order_id');
                  this.state.navigate.push({
                      pathname: '/paymentConfirmation',
                      order_id: paymentResponse.order_id
                  });
              })
              .catch(err => {
                  return err;
              });
            //console.log(context);
        }
    }

    render() {
        return (
            <div className="checkout container">
                <p className="payment-para">Enter your Payment information below to complete the order</p>
                {this.state.canMakePayment ?
                <PaymentRequestButtonElement
                    paymentRequest={this.state.paymentRequest}
                    className="PaymentRequestButton"
                    style={{
                        // For more details on how to style the Payment Request Button, see:
                        // https://stripe.com/docs/elements/payment-request-button#styling-the-element
                        paymentRequestButton: {
                            theme: 'light',
                            height: '64px',
                        },
                    }}
                /> : ""}
                <CardElement onChange={this.handleChange}
                             {...createOptions()}
                />
                <div className="error" role="alert">
                    {this.state.errorMessage}
                </div>
                <button id="stripe-payment-button" className="payment-button-1" onClick={this.submit}>Pay ${this.state.amount}</button>
            </div>
        );
    }

    componentDidMount(){
        this.setState({amount: this.props.amount.total});
        this.setState({billingAddress: this.props.billing_address});
        this.setState({shippingAddress: this.props.shipping_address});
        this.setState({navigate: this.props.navigate});
        //this.state.amount = this.props.amount.total;
        //console.log(this.state.billingAddress);

        this.stripePaymentButtonElement = document.getElementById("stripe-payment-button");
    }

    submitCharge(token) {
       /* axios.post('http://localhost:5000/payment/createItem', {"test":"worked"})
            .then(res =>
            {
                console.log("item created");
                console.log(res);
            })
            .catch(err => console.log(err));*/
    }
}
export default injectStripe(StripePayment);