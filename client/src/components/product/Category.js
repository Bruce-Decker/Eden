import React, { Component } from 'react';
import './Product.css';

import { BrowserRouter as Route, Link } from 'react-router-dom';

class Category extends Component {
  render() {
    return (
      <div class="col-2 product-category">
        <Link style={{textDecoration: 'none'}} to={'/product/' + this.props.name.toLowerCase()}>
          <button onClick={() => window.scrollTo(0, 0)} class="product-category-button">{this.props.name}</button>
        </Link>
      </div>
    )
  }
}

export default Category;