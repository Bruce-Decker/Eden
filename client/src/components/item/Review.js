import React, { Component } from 'react';
import './Item';

import apple from '../../images/apple.png'
import star from '../../images/rating.png'
import map from '../../images/map.jpg'

const reviews = [
  {
    user: 'John',
    img: apple,
    review: 'Apples are extremely rich in important antioxidants, flavanoids, and dietary fiber. The phytonutrients and antioxidants in apples may help reduce the risk of developing cancer, hypertension, diabetes, and heart disease.',
    date: '2 days ago',
    rating: [1, 2, 3, 4]
  },
  {
    user: 'Bob',
    img: apple,
    review: 'Apples are high in fiber and water — two qualities that make them filling.',
    date: '6 days ago',
    rating: [1, 2, 3]
  },
]

class Review extends Component {
  render() {
    return (
      <div class="container-review">
        <div class="item-header">Reviews</div>
        <div class="row" style={{marginTop: "1rem"}}>
          <div class="col-5">
            <img src={map} alt="Map" style={{maxWidth: "100%"}}></img>
          </div>
          <div class="col-7">
            <ul class="item-review-list">
              {reviews.map(review => {
                return (
                  <li class="item-review-item row">
                    <div class="col-3">
                      <img class="item-recommendation-img" style={{width: "100%"}} src={review.img} alt="Item"></img>
                      <div class="item-recommendation-title">{review.user}</div>
                    </div>
                    <div class="col-6">
                      <div>{review.review}</div>
                      <div>
                        {review.rating.map(i => {
                          return <img class="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                        })}
                      </div>
                      <div style={{marginTop: "1rem", color: "#888888"}}>{review.date}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;