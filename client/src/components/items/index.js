import React, { Component } from 'react';
import './Items.css';
import RegularBanner from '../banner/RegularBanner';

import List from './List'


class Items extends Component {
  render() {
    const {category} = this.props.match.params
    return (
      <div>
        <RegularBanner />
        <List category={category}/>
      </div>
    )
  }
}


export default Items;