import React, { Component } from 'react';
import './Payment.css';
//import {Pay} from './pay.js';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import { withRouter } from 'react-router-dom';

class Payment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>Payment Page!!! - Work In Progress</span>
            </div>
        );
    }

    componentDidMount(){
        console.log(this.props);
    }
}

export default withRouter(Payment);