import React, { Component } from 'react';
import './SearchResults.css';
import apple from '../../images/apple.png';
import star from '../../images/rating.png';

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
    return (
      <ul class="search-item-list">
        {this.props.items.map(item => {
          return (
            <li key={item.item_id} class="search-item row">
              <div class="col-2">
                <img class="search-item-img" style={{width: "100%"}} src={item.item_image} alt="Item"></img>
              </div>
              <div class="col-6">
                <div>{item.item_name}</div>
                <div>{item.description}</div>
                <div>{this.renderRating(item.average_rating)}</div>
              </div>
              <div class="col-3">
                <div>{item.price}</div>
              </div>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default SearchResultItems;











