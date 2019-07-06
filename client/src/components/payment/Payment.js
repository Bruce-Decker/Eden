import React, { Component } from 'react';
import {CardElement, Elements, injectStripe, StripeProvider} from 'react-stripe-elements';
import StripePayment from './StripePayment';
import styles from './Payment.css';
//import {Pay} from './pay.js';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import { withRouter } from 'react-router-dom';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        // User clicked submit
    }

    render() {
        return (
            <div>
                <RegularBanner/>
                <div id="payment-header">
                    <h1>Payment</h1>
                </div>
                <div id='payment-container'>
                    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                        <div className="stripe-payment">
                            <Elements>
                                <StripePayment className={styles.cardPayment}/>
                            </Elements>
                        </div>
                    </StripeProvider>
                </div>
            </div>
        );
    }

    componentDidMount(){
        console.log(this.props);
    }
}

export default withRouter(Payment);