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
        this.state = {
            order_id: '',
            payment_status: 'Payment Failed'
        };
    }

    async submit(ev) {
        // User clicked submit
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <RegularBanner/>
                <div class="container">
                    <div id="payment-header">
                        <h1 className="payment-h1">{this.state.payment_status} !!!!</h1>
                    </div>
                    <div>
                        <div class="row">
                            <h1 className="payment-h1">Order Details</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-1 offset-md-11">
                                <button className="payment-home-button" onClick={this.submit}>Back to Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        var order_id = new URLSearchParams(window.location.search).get('order_id');
        if(order_id !== '' || order_id !== '0000' || order_id !== undefined) {
            this.setState({payment_status: 'Payment Successful'});
            this.setState({order_id: order_id});
        }
    }
}

export default withRouter(PaymentConfirmation);