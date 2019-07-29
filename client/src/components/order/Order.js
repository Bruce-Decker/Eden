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
                    <div className="col-md-12">
                        <h6>Order #: {this.state.orderId}</h6>
                    </div>
                </div>
                {this.state.items.map((value, index) => {
                    return <OrderItem itemDetail={value}></OrderItem>
                })}
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.props.orderDetails);
        this.setState({orderId:this.props.orderDetails.order_id});
        this.setState({price:this.props.orderDetails.price});
        this.setState({status:this.props.orderDetails.status});
        this.setState({items: this.props.orderDetails.items});
    }
}

export default withRouter(Order);