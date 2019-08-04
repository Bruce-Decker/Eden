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
            items: []
        }
    }

    render() {
        return (
            <div className="order-item">
                <div className="row">
                    <div className="col-md-12 order-id-title">
                        <h6>Order #: {this.state.orderId}</h6>
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
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.props.orderDetails);
        this.setState({orderId:this.props.orderDetails._id});
        this.setState({price:this.props.orderDetails.price});
        this.setState({status:this.props.orderDetails.status});
        this.setState({items: this.props.orderDetails.items});
    }
}

export default withRouter(Order);