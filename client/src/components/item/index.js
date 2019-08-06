import React, { Component } from 'react';
import './Item.css';

import RegularBanner from '../banner/RegularBanner';

import TopRatedItems from '../cart/TopRatedItems';
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
        <Review item_id={id}/>
        <TopRatedItems/>
        <Footer/>
      </div>
    );
  }  
}

export default Item;