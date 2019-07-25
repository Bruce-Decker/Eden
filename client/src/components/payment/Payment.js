import React, { Component } from 'react';
import {CardElement, Elements, injectStripe, StripeProvider} from 'react-stripe-elements';
import StripePayment from './StripePayment';
import  './Payment.css';
//import {Pay} from './pay.js';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.charges = this.props.location.state;
        this.billing_address = {
            name: this.props.location.addresses ? this.props.location.addresses.bill_name:"",
            address_line1: this.props.location.addresses ? this.props.location.addresses.bill_addr1:"",
            address_line2: this.props.location.addresses ? this.props.location.addresses.bill_addr2:"",
            address_city: this.props.location.addresses ? this.props.location.addresses.bill_city:"",
            address_state: this.props.location.addresses ? this.props.location.addresses.bill_state:"",
            address_zip: this.props.location.addresses ? this.props.location.addresses.bill_zip:"",
            address_country: this.props.location.addresses ? this.props.location.addresses.bill_country:""
        }
    }

    async submit(ev) {
        // User clicked submit
    }

    render() {
        if(!this.props.auth || !this.props.auth.user || !this.props.auth.user.email) {
            return null;
        } else {
            return (
                <div>
                    <RegularBanner/>
                    <div id="payment-header">
                        <h1 className="payment-h1">Payment</h1>
                    </div>
                    <div id='payment-container'>
                        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                            <div className="stripe-payment">
                                <Elements>
                                    <StripePayment className="cardPayment" amount={this.charges} billing_address={this.billing_address}/>
                                </Elements>
                            </div>
                        </StripeProvider>
                    </div>
                </div>
            );
        }
    }

    componentWillMount() {
        if(!this.props.auth || !this.props.auth.user || !this.props.auth.user.email) {
            let url = '/login';

            this.props.history.push({
                pathname: url
            });
        }
    }

    componentDidMount(){
        //console.log(this.billing_address);
    }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default withRouter(connect(
  mapStateToProps
)(Payment));


















