import React, {Component} from 'react';
import axios from 'axios';
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
            shippingAddress: {}
        };
    }

    state = {
        errorMessage: '',
    };

    handleChange = ({error}) => {
        if (error) {
            this.setState({errorMessage: error.message});
        }
        else {
            this.setState({errorMessage: ''});
        }
    };

    async submit(ev) {
        // User clicked submit
        var stripeToken = {};
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken(this.state.billingAddress)
                .then((data) => {
                    stripeToken = data.token;
                    sessionStorage.setItem('stripe_token', JSON.stringify(stripeToken));
                })
                .then(() => {
                    var charge_details = {
                        amount: this.state.amount,
                        description: "sample charge",
                        stripe_token: JSON.parse(sessionStorage.getItem('stripe_token')),
                        email: sessionStorage.getItem('email')
                    };
                    sessionStorage.removeItem('stripe_token');
                    axios.post('http://localhost:5000/payment/charge', charge_details)
                        .then(res =>
                        {
                            console.log("payment successfull!");
                            sessionStorage.setItem('order_id', res.data.order.order_id !== null? res.data.order.order_id : "0000");
                            sessionStorage.setItem('payment_receipt_url', res.data.receipt_url);
                            //console.log(res.data.receipt_url);
                            //window.location.href = '/paymentConfirmation';
                        })
                        .catch(err => {return err;});
                })
                .then(this.props.handleResult)
                .then(()=>{
                    var shipment_details = {
                      shipTo: {
                        name: this.state.shippingAddress.name,
                        street1: this.state.shippingAddress.address_line1,
                        street2: this.state.shippingAddress.address_line2,
                        city: this.state.shippingAddress.address_city,
                        state: this.state.shippingAddress.address_state,
                        postalCode: this.state.shippingAddress.address_zip,
                        country: this.state.shippingAddress.address_country
                      }
                    };
                    axios.post('http://localhost:5000/shipment/create_label', shipment_details)
                      .then(res =>
                      {
                          console.log("Shipment label created successful!");
                          var order_updated_data = {
                              orderId: sessionStorage.getItem('order_id'),
                              paymentReceiptUrl: sessionStorage.getItem('payment_receipt_url'),
                              trackingId: res.data.trackingNumber
                          };
                          console.log(order_updated_data);
                          axios.post('http://localhost:5000/order/addPostChargeInfo', order_updated_data)
                              .then(orderUpdateRes =>
                              {
                                  console.log("Order updated successfull!");
                              })
                              .catch(err => {return err});
                      })
                      .then(() => {
                          window.location.href = '/paymentConfirmation?order_id='+sessionStorage.getItem('order_id');
                      })
                      .catch(err => {return err});
                })
                .catch(err => this.setState({errorMessage: err.message}));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
        //console.log(this.props);
        //console.log("credit card payment"+ stripeToken.id);
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
                <button className="payment-button-1" onClick={this.submit}>Pay</button>
            </div>
        );
    }

    componentDidMount(){
        this.state.amount = this.props.amount.total;
        this.state.billingAddress = this.props.billing_address;
        this.state.shippingAddress = this.props.shipping_address;
        //this.state.amount = this.props.amount.total;
        //console.log(this.state.billingAddress);
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