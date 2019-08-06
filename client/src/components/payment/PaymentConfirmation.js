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
        this.orderDetailsTitleElement = null;
        this.orderDetailsElement = null;
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
                        <div id="payment-order-details-title" class="row payment-order-details">
                            <h1 className="payment-h1">Order Details</h1>
                        </div>
                        <div id="payment-order-title" className="order-item payment-order-details">
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
                            <div className="row">
                                <div className="col-md-4 shown-item-text">
                                    <span className="shown-item-price">Payment Receipt:&nbsp;</span>
                                    <span><a href={this.state.order_details.payment_receipt_url} target="_blank">Click Here</a></span>
                                </div>
                                <div className="col-md-4">
                                    <span className="shown-item-price">Carrier:&nbsp;</span>
                                    <span>{this.state.order_details.carrierCode}</span>
                                </div>
                                <div className="col-md-4">
                                    <span className="shown-item-price">Tracking Number:&nbsp;</span>
                                    <span>{this.state.order_details.tracking_id}</span>
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
        this.orderDetailsTitleElement = document.getElementById("payment-order-details-title");
        this.orderDetailsElement = document.getElementById("payment-order-title");
        const order_id = this.props.location.hasOwnProperty('order_id') ? this.props.location.order_id : '';
        if (order_id !== '' && order_id !== '0000' && order_id !== undefined) {
              this.setState({payment_status: 'Payment Successful'});
              //this.setState({order_id: order_id});
              this.orderDetailsTitleElement.style.visibility = "visible";
              this.orderDetailsElement.style.visibility = "visible";

              await axios.get('/order/' + order_id)
                  .then((response) => {
                      this.setState({order_details: response.data[0]});
                      console.log(response.data[0]);
                  })
                  .catch(function (error) {
                      return error;
                  });
              await axios.post('/cart/clear', {email: this.state.order_details.email})
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    console.log(err);
                  });
          }
          /*else {
              alert("Order is Invalid!");
              this.props.history.push({
                  pathname: "/"
              });
          }*/
    }
}

export default withRouter(PaymentConfirmation);