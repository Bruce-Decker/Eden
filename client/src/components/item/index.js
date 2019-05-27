import React, { Component } from 'react';
import './Item.css';

import RegularBanner from '../banner/RegularBanner'

import Recommendation from './Recommendation';
import Review from './Review';
import Footer from '../footer/Footer';
import Detail from './Detail';

class Item extends Component {

  render() {
    const id = this.props.match.params.id
    return (
      <div>
        <RegularBanner/>
        <Detail id={id}/>
        <Review/>
        <Recommendation/>
        <Footer/>
      </div>
    );
  }  
 }

export default Item;