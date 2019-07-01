import React, { Component } from 'react';
import './Service.css';

import star from '../../images/rating.png'
import star_zero from '../../images/rating_zero.png'

class Star extends Component {
  
  render() {
    return (
      Array.from(Array(5), (e, i) => {
        return (this.props.rating - i > 0 ? 
                <img alt="star" src={star} className="service-star" onClick={() => this.props.onRating(i + 1)}/>:
                <img alt="zero" src={star_zero} className="service-star" onClick={() => this.props.onRating(i + 1)}/>)
      })
    )
  }
}

export default Star;