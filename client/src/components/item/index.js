import React, { Component } from 'react';
import './Item.css';

import RegularBanner from '../banner/RegularBanner'

import Recommendation from './Recommendation';
import Review from './Review';
import Footer from '../footer/Footer';
import Detail from './Item';

class Item extends Component {

  render() {
    return (
      <div>
        <RegularBanner/>
        <Detail/>
        <Review/>
        <Recommendation/>
        <Footer/>
      </div>
    );
  }  
 }

export default Item;