import React, { Component } from 'react';
import './SearchResults.css';
import CartAddButton from '../cart/CartAddButton';
import apple from '../../images/apple.png';
import star from '../../images/rating.png';

import { BrowserRouter as Route, Link } from 'react-router-dom';

class SearchResultItems extends Component {
  constructor(props) {
    super(props);
  }

  renderRating(avg_rating) {
    let stars = [];
    for (let i=0; i<parseInt(avg_rating); i++) {
      stars.push(<img class="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>);
    }
    return stars;
  }

  render() {
    if (this.props.items.length === 0) {
      return (
        <div className="sr-outer-div">
          <span class="sr-no-results">Sorry, no results found.</span>
          <br/>
          <Link to="/product">
            <button onClick={() => window.scrollTo(0, 0)} className="sr-shop-button">Browse Items</button>
          </Link>
        </div>
      );
    } else {
      return (
        <ul class="search-item-list">
          {this.props.items.map(item => {
            return (
              <li key={item.item_id} class="search-item row">
                <div class="col-2">
                  <Link to={"/items/" + item.item_id}>
                    <img onClick={() => window.scrollTo(0, 0)} 
                         class="search-item-img" style={{width: "100%"}} src={item.item_image} alt="Item"></img>
                  </Link>
                </div>
                <div class="col-6">
                  <Link to={"/items/" + item.item_id}>
                    <div onClick={() => window.scrollTo(0, 0)}>{item.item_name}</div>
                  </Link>
                  <div>{item.description}</div>
                  <div>{this.renderRating(item.average_rating)}</div>
                </div>
                <div class="col-1">
                  <div>{"$" + item.price}</div>
                </div>
                <div class="col-2">
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

export default SearchResultItems;











