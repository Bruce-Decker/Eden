import React, { Component } from 'react';
import './Cart.css';

import CartAddButton from './CartAddButton';

import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

class SimilarItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recs: []
    };
  }

  componentWillMount() {
    // show top items
    axios
      .get('/recs/getTopRatedItems')
      .then(res => {
        console.log(res);
        this.setState({
          recs: res.data
        })
      })
      .catch(err =>
        console.log(err)
      );
  }

  render() {
    return (
      <div id="top-rated-items-1">
        <h3 id="top-rated-items-h3">Top Rated Items</h3>
        <div className="top-rated-items-2">
          {this.state.recs.slice(0,25).map(rec => {
            return (
              <div key={"tri-"+rec.id} className="top-rated-items-3">
                <div>
                  <img className="top-rated-items-img" style={{width: "100%"}} src={rec.image} alt="Item"></img>
                </div>
                <div>
                  <Link to={"/items/" + rec.id}>
                    <span className="top-rated-items-title" onClick={() => window.scrollTo(0, 0)}>{rec.name}</span>
                  </Link>
                  <div><span className="top-rated-items-price">{'$'+rec.price}</span></div>
                  <StarRatings
                    rating={rec.avg_rating}
                    starRatedColor='rgb(40,167,69)'
                    numberOfStars={5}
                    name='rating'
                    starDimension='20px'
                    starSpacing='1px'
                  />
                  <CartAddButton item={rec} cls={"addtocart-btn-sm"}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  }
};

export default connect(
  mapStateToProps
)(SimilarItems);













