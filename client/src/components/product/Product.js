import React, { Component } from 'react';
import './Product.css';
import { connect } from 'react-redux';
import RegularBanner from '../banner/RegularBanner';
import Category from './Category';
import Scroller from './Scroller';
import axios from 'axios';

import { BrowserRouter as Route, Link } from 'react-router-dom';

const categories = ['Appliances', 'Arts', 'Books', 'Clothing', 'Computers', 'Electronics', 'Games', 'Home']

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rfy: [],
      bsl: [],
      dls: []
    };
  }

  componentWillMount() {
    let email = this.props.auth.user.email;
    let params = {
      email: 'hoxodo@atech5.com'
    }
    
    axios
      .post('/recs/getUserRecs', params)
      .then(res => {
        console.log(res);
        this.setState({
          rfy: res.data
        })
      })
      .catch(err =>
        console.log(err)
      );

    axios
      .get('/recs/getTopRatedItems')
      .then(res => {
        console.log(res);
        this.setState({
          bsl: res.data
        })
      })
      .catch(err =>
        console.log(err)
      );

    axios
      .get('/recs/getTodaysDeals')
      .then(res => {
        console.log(res);
        this.setState({
          dls: res.data
        })
      })
      .catch(err =>
        console.log(err)
      );
  }

  render() {
    return (
      <div>
        <RegularBanner />
        <div>
          <Scroller header="Recommended for you" data={this.state.rfy ? this.state.rfy : this.state.bsl} keyPrefix={"rfy"}/>
          <Scroller header="Bestsellers" data={this.state.bsl} keyPrefix={"bsl"}/>
          <Scroller header="Today's deals" data={this.state.dls ? this.state.dls : this.state.bsl} keyPrefix={"dls"}/>
          <div class="product-container">
            <div class="product-header">Categories</div>
            <div class="row" style={{marginLeft: "0.6rem", marginRight: "0.2rem"}}>
              {/* {Array.from(Array(6), (e, i) => {
                return  <Category key={i} name={categories[i]}/>
              })} */}
               {categories.map(category => {
                  return  <Category name={category}/>
               })}
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(
  mapStateToProps
)(Product);






























