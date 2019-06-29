import React, { Component } from 'react';
import './Cart.css';

import VerticalScroller from './VerticalScroller';

import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class OtherBoughtItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recs: [],
      showRecs: false
    };
  }

  componentWillMount() {
    // show user-based recommendations
    let email = this.props.auth.user.email;
    let params = {
      email: email
    }
    
    axios
      .post('/recs/getUserRecs', params)
      .then(res => {
        console.log(res);
        this.setState({
          recs: res.data,
          showRecs: true
        })
      })
      .catch(err =>
        console.log(err)
      );
  }

  render() {
    return (
      
      <div id="user-recs-1">
        {this.state.showRecs ?
          <VerticalScroller header="Other Users Bought" data={this.state.recs} keyPrefix="obi"/>
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
)(OtherBoughtItems);













