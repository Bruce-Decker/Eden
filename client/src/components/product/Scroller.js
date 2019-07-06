import React, { Component } from 'react';
import './Product.css';

import CartAddButton from '../cart/CartAddButton';
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

class Scroller extends Component {
  render() {
    return (
      <div className="row-fluid product-container">
        <div className="product-header">{this.props.header}</div>
        <div className="col-lg-12 col-md-10 ">
          <div className="cover-container">
            {this.props.data.map(rec => {
              return (
                <div key={this.props.keyPrefix+"-"+rec.id} className="cover-item">
                  <div>
                    <img
                      className={this.props.keyPrefix+"-img"}
                      style={{width: "100%"}}
                      src={rec.image ? clothingJpg : getImage(rec.category)}
                      alt="Item">
                    </img>
                  </div>
                  <div>
                    <Link to={"/items/" + rec.id}>
                      <span className={this.props.keyPrefix+"-title"} onClick={() => window.scrollTo(0, 0)}>{rec.name}</span>
                    </Link>
                    <div><span className={this.props.keyPrefix+"-price"}>{'$'+rec.price.toFixed(2)}</span></div>
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

export default Scroller;