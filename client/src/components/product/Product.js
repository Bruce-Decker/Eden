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
      dls: [],
      showUserRecs: false,
      showTopRatedItems: false,
      showTodaysDeals: false,
      
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
          rfy: res.data,
          showUserRecs: true
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
          bsl: res.data,
          showTopRatedItems: true
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
          dls: res.data,
          showTodaysDeals: true
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
          {this.state.showUserRecs ? 
              <Scroller header="Recommended for you" data={this.state.rfy} keyPrefix={"rfy"}/>
              : null }
          {this.state.showTopRatedItems ? 
             <Scroller header="Bestsellers" data={this.state.bsl} keyPrefix={"bsl"}/>
             : null }
          {this.state.showTodaysDeals ? 
             <Scroller header="Today's deals" data={this.state.dls} keyPrefix={"dls"}/>
             : null }
          </div>
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






























