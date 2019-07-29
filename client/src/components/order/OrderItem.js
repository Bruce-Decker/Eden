import React, { Component } from 'react';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import { withRouter } from 'react-router-dom';

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: '',
            item_name: '',
            item_image: '',
            description: '',
            category: '',
            price: '',
            quantity: ''
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <img
                        className="item-detail-img"
                        src={"../../images/" + this.state.item_image}
                        alt="Item Image"
                    />
                </div>
                <div className="col-md-8">
                    <p>name: {this.state.item_name}</p>
                    <p>description: {this.state.description}</p>
                    <p>price: {this.state.price}</p>
                    <p>quantity: {this.state.quantity}</p>
                </div>
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.props.orderDetails);
        this.setState({seller:this.props.itemDetail.seller});
        this.setState({item_name:this.props.itemDetail.item_name});
        this.setState({item_image:this.props.itemDetail.item_image});
        this.setState({description: this.props.itemDetail.description});
        this.setState({category: this.props.itemDetail.category});
        this.setState({price: this.props.itemDetail.price});
        this.setState({quantity: this.props.itemDetail.quantity});
    }
}

export default withRouter(OrderItem);