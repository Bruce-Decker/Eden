import React, { Component } from 'react';
import './Cart.css';

import CartAddButton from './CartAddButton';
import StarRatings from 'react-star-ratings';

import { BrowserRouter as Route, Link } from 'react-router-dom';

class VerticalScroller extends Component {
  render() {
    return (
      <div className="cart-product-container">
        <div className="cart-product-header">
          <div>{this.props.header}</div>
        </div>
        <div className="">
          <div className="cart-cover-container">
            {this.props.data.map(rec => {
              return (
                <div key={this.props.keyPrefix+"-"+rec.id} className="row cart-cover-item">
                  <div className="col-4">
                    <img className={this.props.keyPrefix+"-img"} style={{width: "100%"}} src={rec.image} alt="Item"></img>
                  </div>
                  <div className="col-8">
                    <Link to={"/items/" + rec.id}>
                      <span className={this.props.keyPrefix+"-title"} onClick={() => window.scrollTo(0, 0)}>{rec.name}</span>
                    </Link>
                    <div className={this.props.keyPrefix+"-price"}>{'$'+rec.price}</div>
                    <StarRatings
                      rating={rec.avg_rating ? rec.avg_rating : 4+Math.random()}
                      starRatedColor='rgb(40,167,69)'
                      numberOfStars={5}
                      name='rating'
                      starDimension='18px'
                      starSpacing='1px'
                    />
                    <br/>
                    <CartAddButton item={rec} cls={"addtocart-btn-sm"}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default VerticalScroller;