import React, { Component } from 'react';
import {CardElement, Elements, injectStripe, StripeProvider} from 'react-stripe-elements';
import StripePayment from './StripePayment';
//import './Payment.css';
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
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <div className="example">
                    <h1>Payment</h1>
                    <Elements>
                        <StripePayment />
                    </Elements>
                </div>
            </StripeProvider>
        );
    }

    componentDidMount(){
        console.log(this.props);
    }
}

export default withRouter(Payment);