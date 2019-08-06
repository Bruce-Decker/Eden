import React, { Component } from 'react';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import OrderItem from './OrderItem';

import { withRouter } from 'react-router-dom';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId:'',
            price: '',
            status: '',
            receipt: '',
            carrier: '',
            trackingNumber: '',
            orderDate: '',
            items: []
        }
    }

    render() {
        return (
            <div className="order-item">
                <div className="row">
                    <div className="col-md-8 order-id-title">
                        <h6>Order #: {this.state.orderId}</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>Placed on: {this.state.orderDate}</h6>
                    </div>
                </div>
                {this.state.items.map((value, index) => {
                    return <OrderItem itemDetail={value}></OrderItem>
                })}
                <div className="row">
                    <div className="col-md-4 shown-item-text">
                        <span className="shown-item-price">Total Price:&nbsp;</span>
                        <span>{this.state.price}</span>
                    </div>
                    <div className="col-md-4">
                        <span className="shown-item-price">Status:&nbsp;</span>
                        <span>{this.state.status}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 shown-item-text">
                        <span className="shown-item-price">Payment Receipt:&nbsp;</span>
                        <span><a href={this.state.receipt} target="_blank">Click Here</a></span>
                    </div>
                    <div className="col-md-4">
                        <span className="shown-item-price">Carrier:&nbsp;</span>
                        <span>{this.state.carrier}</span>
                    </div>
                    <div className="col-md-4">
                        <span className="shown-item-price">Tracking Number:&nbsp;</span>
                        <span>{this.state.trackingNumber}</span>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.props.orderDetails);
        this.setState({orderId:this.props.orderDetails._id});
        this.setState({price:this.props.orderDetails.price});
        this.setState({status:this.props.orderDetails.status});
        this.setState({items: this.props.orderDetails.items});
        this.setState({receipt: this.props.orderDetails.payment_receipt_url});
        this.setState({carrier: this.props.orderDetails.carrierCode});
        this.setState({trackingNumber: this.props.orderDetails.tracking_id});
        const orderDate = new Date(this.props.orderDetails.createdAt);
        const dd = String(orderDate.getDate()).padStart(2, '0');
        const mm = String(orderDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = orderDate.getFullYear();
        this.setState({orderDate: mm + '/' + dd + '/' + yyyy});
    }
}

export default withRouter(Order);