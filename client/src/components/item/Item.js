import React, { Component } from 'react';
import './Item.css';

import Add from './Add'
import apple from '../../images/apple.png'
import star from '../../images/rating.png'

const item = {
  id: 1,
  title: 'Apple',
  by: 'Apple',
  desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus pumila). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.',
  rating: [1, 2, 3, 4, 5],
  price: '$9.99'
}

class Detail extends Component {

  render() {
    return (
      <div class="container-item">
        <div class="row">
        <div class="col-1"/>
        <div class="col-6 align-items-center item-img" style={{paddingLeft: "8vw", paddingRight: "8vw"}}>
          <img src={apple} alt="Item" style={{height: "100%"}}></img>
        </div>
        <div class="col-3" >
          <div class="item-title">{item.title}</div>
          <div class="item-by">{item.by}</div>
          <div class="item-desc">{item.desc}</div>
          <div>
            {item.rating.map(i => {
              return <img class="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
            })}
          </div>
          <div class="item-price">{item.price}</div>
          <div ><Add id={item.id}/><span style={{marginLeft: "1rem"}}></span></div>
        </div>
        </div>
        <div class="col-1"/>
      </div>
    );
  }  
}

export default Detail;