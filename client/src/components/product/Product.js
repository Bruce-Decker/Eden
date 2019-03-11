import React, { Component } from 'react';
import './Product.css';
import RegularBanner from '../banner/RegularBanner'

class Product extends Component {
    render() {
      return (
        <div>
             <RegularBanner />
            <h3>*Product*</h3>
        </div>
      );
    }
}

export default Product;