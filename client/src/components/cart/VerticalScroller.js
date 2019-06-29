import React, { Component } from 'react';
import './Cart.css';

import CartAddButton from './CartAddButton';
import StarRatings from 'react-star-ratings';

import { BrowserRouter as Route, Link } from 'react-router-dom';

import appliances from '../../images/appliances.png';
import arts from '../../images/arts.png';
import books from '../../images/books.png';
import clothing from '../../images/clothing.png';
import computers from '../../images/computers.png';
import electronics from '../../images/electronics.png';
import games from '../../images/games.png';
import home from '../../images/home.png';
import clothingJpg from '../../images/clothing.jpg';

class VerticalScroller extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div className="cart-product-container">
        <div className="cart-product-header">
          <div>{this.props.header}</div>
        </div>
        <div className="">
          <div className="cart-cover-container">
            {this.props.data.map(rec => {
              rec.tst = '../../images/clothing.jpg';
              return (
                <div key={this.props.keyPrefix+"-"+rec.id} className="row cart-cover-item">
                  <div className={this.props.keyPrefix+"-img-div col-4"}>
                    <img
                      className={this.props.keyPrefix+"-img"}
                      style={{width: "100%"}}
                      src={rec.image ? clothingJpg : getImage(rec.category)}
                      alt="Item">
                    </img>
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

function getImage(category) {
  switch (category) {
    case "appliances":
      return appliances
    case "arts":
      return arts
    case "books":
      return books
    case "computers":
      return computers
    case "clothing":
      return clothing
    case "electronics":
      return electronics
    case "games":
      return games
    case "home":
      return home
    default:
  }
}

export default VerticalScroller;