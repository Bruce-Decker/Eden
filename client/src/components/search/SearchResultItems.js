import React, { Component } from 'react';
import './SearchResults.css';
import CartAddButton from '../cart/CartAddButton';
import Item from '../service/Item';
import SearchResultItem from './SearchResultItem';

import apple from '../../images/apple.png';
import star from '../../images/rating.png';
import star_half from '../../images/rating_half.png';
import star_zero from '../../images/rating_zero.png';

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
    let num_stars = 5;
    let rt = avg_rating;

    while (num_stars > 0) {

      if (rt > 0.75) {
        stars.push(<img
          className="item-rating"
          src={star}
          alt="Rating"
          style={{width: "16px", height: "16px"}}>
        </img>);

        num_stars -= 1;
        rt -= 1;

      } else if (rt > 0.25) {

        stars.push(<img
          className="item-rating"
          src={star_half}
          alt="Rating"
          style={{width: "16px", height: "16px"}}>
        </img>);

        num_stars -= 1;
        rt -= 1;

      } else {

        stars.push(<img
          className="item-rating"
          src={star_zero}
          alt="Rating"
          style={{width: "16px", height: "16px"}}>
        </img>);

        num_stars -= 1;
        rt -= 1;

      }
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
      if (this.props.searchType == 'itm') {
        return (
          <div className="search-item-list">
            {
              this.props.items.map(item => {
                return (
                  <Link to={"/items/" + item.item_id}>
                    <div key={item.item_id} className="search-item row">
                      <div className="col-3">
                        <img
                          onClick={() => window.scrollTo(0, 0)} 
                          className="search-item-img"
                          style={{width: "100%"}}
                          src={item.item_image ? clothingJpg : getImage(item.category)}
                          alt="Item">
                        </img>
                      </div>
                      <div className="col-9">
                        <div className="search-item-name">{item.item_name}</div>
                        <div className="search-item-description">{item.description}</div>
                        <div className="search-item-btm">
                          <div className="search-item-float search-item-rating">{this.renderRating(item.average_rating)}</div>
                          <div className="search-item-float search-item-price">{"$" + item.price.toFixed(2)}</div>
                          <div className="search-item-float search-item-btn">
                            <CartAddButton item={item} cls={"addtocart-btn-sm"}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        );
      } else if (this.props.searchType == 'svc') {
        return (
          Array.from(this.props.items, (e, i) => {
            return (
              <div key={i} style={{marginBottom: "2.5rem"}}>
                <Item
                  key={i}
                  id={e._id}
                  name={e.name}
                  desc={e.desc}
                  rating={e.rating}
                  count={e.reviews.count}
                  phone={e.phone}
                  email={e.email}
                  logo={e.logo}
                  service={e}
                />
              </div>
            )
          })
        )
      }
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











