import React, { Component } from 'react';
import './Cart.css';

import CartAddButton from './CartAddButton';
import Scroller from '../product/Scroller';

import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

class TopRatedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recs: [],
      showRecs: false
    };
  }

  componentWillMount() {
    // show top items
    axios
      .get('/recs/getTopRatedItems')
      .then(res => {
        console.log(res);
        if(!res.data.msg) {
          this.setState({
            recs: res.data,
            showRecs: true
          })
        }
      })
      .catch(err =>
        console.log(err)
      );
  }

  render() {
    return (
      <div id="top-rated-items-1">
        {this.state.showRecs ?
          <Scroller header="Top Rated Items" data={this.state.recs} keyPrefix="tri"/>
          : null}
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
)(TopRatedItems);













