import React, {Component} from 'react';
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
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken().then(this.props.handleResult);
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
        console.log("credit card payment")
    }

    render() {
        return (
            <div className="checkout container">
                <p className="payment-para">Would you like to complete the purchase?</p>
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
}

export default injectStripe(StripePayment);