import React, { Component } from 'react';
import './Item';

import apple from '../../images/apple.png'
import star from '../../images/rating.png'

const items = [
  {
    id: 30,
    title: 'Orange',
    img: apple,
    rating: [1, 2, 3, 4],
    price: '$8.99'
  },
  {
    id: 32,
    title: 'Apple',
    img: apple,
    rating: [1, 2,3],
    price: '$2.99'
  },
  {
    id: 12,
    title: 'Melon',
    img: apple,
    rating: [1, 2, 3, 4, 5],
    price: '$18.99'
  },
  {
    id: 3,
    title: 'Orange',
    img: apple,
    rating: [1],
    price: '$1.99'
  },
  {
    id: 49,
    title: 'Apple',
    img: apple,
    rating: [1, 2, 3],
    price: '$5.99'
  },
]

class Recommendation extends Component {
  render() {
    return (
      <div class="container-recommendation">
        <div class="item-header">Related items</div>
        <div style={{marginTop: "1rem"}}>
          <ul class="item-recommendation-list">
            {items.map(item => {
              return (
                <li class="item-recommendation-item" style={{float: "left"}}>
                  <img class="item-recommendation-img" src={item.img} alt="Item"></img>
                  <div class="align-items-center item-recommendation-rating">
                    {item.rating.map(i => {
                      return <img class="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                    })}
                  </div>
                  <div class="item-recommendation-title">{item.title}</div>
                  <div class="item-recommendation-price">{item.price}</div>
                </li>
              )
          })}
          </ul>
          <div style={{clear: "both"}}></div>
        </div>
      </div>
    );
  }
}

export default Recommendation;