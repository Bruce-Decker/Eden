import React, { Component } from 'react';
import './SearchResults.css';
import CartAddButton from '../cart/CartAddButton';
import apple from '../../images/apple.png';
import star from '../../images/rating.png';

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

class SearchResultItems extends Component {
  constructor(props) {
    super(props);
  }

  renderRating(avg_rating) {
    let stars = [];
    for (let i=0; i<parseInt(avg_rating); i++) {
      stars.push(<img className="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>);
    }
    return stars;
  }

  render() {
    if (this.props.items.length === 0) {
      return (
        <div className="sr-outer-div">
          <span className="sr-no-results">Sorry, no results found.</span>
          <br/>
          <Link to="/product">
            <button onClick={() => window.scrollTo(0, 0)} className="sr-shop-button">Browse Items</button>
          </Link>
        </div>
      );
    } else {
      return (
        <ul className="search-item-list">
          {this.props.items.map(item => {
            return (
              <li key={item.item_id} className="search-item row">
                <div className="col-1">
                  <Link to={"/items/" + item.item_id}>
                    <img onClick={() => window.scrollTo(0, 0)} 
                         className="search-item-img" style={{width: "100%"}} src={item.item_image ? clothingJpg : getImage(item.category)} alt="Item"></img>
                  </Link>
                </div>
                <div className="col-5">
                  <Link to={"/items/" + item.item_id}>
                    <div onClick={() => window.scrollTo(0, 0)}>{item.item_name}</div>
                  </Link>
                  <div>{item.description}</div>
                  <div>{this.renderRating(item.average_rating)}</div>
                </div>
                <div className="col-1">
                  <div>{"$" + item.price}</div>
                </div>
                <div className="col-1">
                  <CartAddButton item={item} cls={"addtocart-btn-lg"}/>
                </div>
              </li>
            )
          })}
        </ul>
      );
    }
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

export default SearchResultItems;











