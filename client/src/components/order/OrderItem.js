import React, { Component } from 'react';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import {Link, withRouter} from 'react-router-dom';

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_id: '',
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
                <div className="col-md-7">
                    <Link to={"/items/" + this.state.item_id}>
                        <div className="row shown-item-card">
                            <div className="col-12">
                                <div className="shown-item-text">
                                    <span className="shown-item-name">Name:&nbsp;</span>
                                    <span>{this.state.item_name}</span>
                                </div>
                                <div className="shown-item-text">
                                    <span className="shown-item-description">Description:&nbsp;</span>
                                    <span>{this.state.description}</span>
                                </div>
                                <div className="shown-item-text">
                                    <span className="shown-item-category">Category:&nbsp;</span>
                                    <span>{this.state.category}</span>
                                </div>
                                <div className="shown-item-text">
                                    <span className="shown-item-price">Price:&nbsp;$</span>
                                    <span>{this.state.price}</span>
                                </div>
                                <div className={"shown-item-text "}>
                                    <span className="shown-item-bid-price">Quantity:&nbsp;</span>
                                    <span>{this.state.quantity}</span>
                                </div>
                                <div className={"shown-item-text "}>
                                    <span className="shown-item-bid-price">Seller:&nbsp;</span>
                                    <span>{this.state.seller}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.props.orderDetails);
        this.setState({item_id:this.props.itemDetail.item_id});
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