import React, { Component } from 'react';
//import {Pay} from './pay.js';
import  './Payment.css';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import { withRouter } from 'react-router-dom';
import axios from "axios";
import OrderItem from "../order/OrderItem";

class PaymentConfirmation extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            order_details: {
                items: []
            },
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
                        <div className="order-item">
                            <div className="row">
                                <div className="col-md-12 order-id-title">
                                    <h6>Order #: {this.state.order_details._id}</h6>
                                </div>
                            </div>
                            {this.state.order_details.items.map((value, index) => {
                                return <OrderItem itemDetail={value}></OrderItem>
                            })}
                            <div className="row">
                                <div className="col-md-4 shown-item-text">
                                    <span className="shown-item-price">Total Price:&nbsp;</span>
                                    <span>{this.state.order_details.price}</span>
                                </div>
                                <div className="col-md-4">
                                    <span className="shown-item-price">Status:&nbsp;</span>
                                    <span>{this.state.order_details.status}</span>
                                </div>
                            </div>
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

    async componentDidMount() {
        var order_id = '5d3f3a0f7638875170dcbfe9'; //this.props.location.hasOwnProperty('order_id') ? this.props.location.order_id : '';
        if (order_id !== '' && order_id !== '0000' && order_id !== undefined) {
            this.setState({payment_status: 'Payment Successful'});
            //this.setState({order_id: order_id});

            await axios.get('/order/' + order_id)
                .then((response) => {
                    this.setState({order_details: response.data[0]});
                    console.log(response.data[0]);
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
}

export default withRouter(PaymentConfirmation);