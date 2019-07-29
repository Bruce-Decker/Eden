import React, { Component } from 'react';
import axios from 'axios';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import Order from './Order';
import  './Order.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class PaymentConfirmation extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            orders:[]
        };
    }

    handleChange(e) {
        let arr = e.target.value.split('_');
        let email = this.props.auth.user.email;
        let iid = arr[0];
        let newQuantity = parseInt(arr[1]);
        this.props.changeQuantity(email, iid, newQuantity);
    }

    render() {
        return (
            <div>
                <RegularBanner/>
                <div class="container">
                    <div className="order-history-header">
                        <h1 className="order-history-title">Order History</h1>
                    </div>
                    {this.state.orders.map((value, index) => {
                        return <Order orderDetails={value}></Order>
                    })}
                </div>
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.props.auth.user.email);
        axios.post('http://localhost:5000/order/getAllOrders', {
            email: this.props.auth.user.email
        })
        .then((response) => {
            this.setState({orders: response.data});
        })
        .catch(function (error) {
            return error;
        });
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

export default connect(
    mapStateToProps
)(PaymentConfirmation);