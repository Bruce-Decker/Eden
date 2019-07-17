import React, { Component } from 'react';
//import {Pay} from './pay.js';
import  './Payment.css';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import { withRouter } from 'react-router-dom';

class PaymentConfirmation extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

    }

    async submit(ev) {
        // User clicked submit
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <RegularBanner/>
                <div id="payment-header">
                    <h1 className="payment-h1">Payment Successful !!!!</h1>
                </div>
                <div>
                    <button className="payment-button-1" onClick={this.submit}>Back to Home</button>
                </div>
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.billing_address);
    }
}

export default withRouter(PaymentConfirmation);