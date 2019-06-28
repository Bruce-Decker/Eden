import React, { Component } from 'react';
import './Product.css';

import CartAddButton from '../cart/CartAddButton';
import StarRatings from 'react-star-ratings';

import { BrowserRouter as Route, Link } from 'react-router-dom';

class Scroller extends Component {
  render() {
    return (
      <div class="row-fluid product-container">
        <div class="product-header">{this.props.header}</div>
        <div class="col-lg-12 col-md-10 ">
          <div class="cover-container">
            {this.props.data.map(rec => {
              return (
                <div key={this.props.keyPrefix+"-"+rec.id} className="cover-item">
                  <div>
                    <img className={this.props.keyPrefix+"-img"} style={{width: "100%"}} src={rec.image} alt="Item"></img>
                  </div>
                  <div>
                    <Link to={"/items/" + rec.id}>
                      <span className={this.props.keyPrefix+"-title"} onClick={() => window.scrollTo(0, 0)}>{rec.name}</span>
                    </Link>
                    <div><span className={this.props.keyPrefix+"-price"}>{'$'+rec.price}</span></div>
                    <StarRatings
                      rating={rec.avg_rating ? rec.avg_rating : 4+Math.random()}
                      starRatedColor='rgb(40,167,69)'
                      numberOfStars={5}
                      name='rating'
                      starDimension='20px'
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

export default Scroller;