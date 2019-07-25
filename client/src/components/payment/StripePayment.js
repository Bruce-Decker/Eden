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
                    var charge_details = {
                        amount: this.state.amount,
                        description: "sample charge",
                        stripe_token: data.token
                    };
                    axios.post('http://localhost:5000/payment/charge', charge_details)
                        .then(res =>
                        {
                            console.log("payment successfull!");
                            //console.log(res);
                            window.location.href = '/paymentConfirmation';
                        })
                        .catch(err => console.log(err));
                })
                .then(this.props.handleResult)
                .catch(err => this.setState({errorMessage: err.message}));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
        console.log(this.props);
        console.log("credit card payment"+ stripeToken.id);
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
        //this.state.amount = this.props.amount.total;
        console.log(this.state.billingAddress);
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