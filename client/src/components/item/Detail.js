import React, { Component } from 'react';
import './Item.css';
import { BrowserRouter as Route, Link } from 'react-router-dom';

import axios from 'axios'

import CartAddButton from '../cart/CartAddButton'
import Add from './Add'
import Try from './Try'
import apple from '../../images/apple.png'
import star from '../../images/rating.png'
import appliances from '../../images/appliances.png';
import arts from '../../images/arts.png';
import books from '../../images/books.png';
import clothing from '../../images/clothing.png';
import computers from '../../images/computers.png';
import electronics from '../../images/electronics.png';
import games from '../../images/games.png';
import home from '../../images/home.png';
import clothingJpg from '../../images/clothing.jpg';

class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: null
    };

    this.getMaxBid = this.getMaxBid.bind(this);
    this.getBidVisibility = this.getBidVisibility.bind(this);
  }

  async componentWillMount() {
    const response = await axios.get('/items/' + this.props.id)
    console.log(response)
    if (response.data[0]) {
        this.setState({
          item: response.data[0]
        })
    }
   
  }

  getBidVisibility(bid_price) {
    // no bid price means that bidding is not supported for this item
    if (!('bid_price' in this.state.item) || bid_price == null) {
      return 'item-bids-hide';
    } else {
      return 'item-bids-show';
    }
  }

  getMaxBid(bids) {
    if(bids.length === 0) {
      return 'No bids yet!';
    }

    // get the object containing the max bid
    let maxo = bids.reduce(function(prev, curr) {
      return (prev.amount > curr.amount) ? prev : curr
    });

    return 'Current bid: $' + maxo.amount.toFixed(2) + ' -- ' + maxo.email;
  }

  render() {
    if (this.state.item != null) {
      const item = this.state.item
      return (
        <div className="container-item">
          <div className="row">
          <div className="col-1"/>
          <div className="col-6 align-items-center item-img" style={{paddingLeft: "8vw", paddingRight: "8vw"}}>
           
            <img
              key={item.item_id}
              className="item-detail-img"
              src={item.item_image ? clothingJpg : getImage(item.category)}
              alt="Item Image"
            />    
          </div>
          <div className="col-3" >
            <div className="item-title">
              {item.item_name}
              <span style={{marginLeft: "1rem"}}></span>
              <Try id={item.item_id} ar={item.ar}></Try>
            </div>
            <div className="item-by">{item.category}</div>
            <div className="item-desc"><Link to  = {`/vr/${item.item_id}`}>Try VR</Link></div>
            <div className="item-desc">{item.description}</div>
            <div>
              {Array.from(Array(item.average_rating), (e, i) => {
                return <img key={i} src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
              })}
            </div>
            <div className="item-price">${item.price.toFixed(2)}</div>
            <div>
              <CartAddButton item={this.state.item} cls={"addtocart-btn-sm"}/>
              <span style={{marginLeft: "1rem"}}></span>
            </div>
            <hr/>
            <div className={this.getBidVisibility(this.state.item.bids)}>
              <span>{this.getMaxBid(this.state.item.bids)}</span>
            </div>
            <hr/>
          </div>
          </div>
          <div className="col-1"/>
        </div>
      );
    } 
    return null
  }  
 
}

function getImage(category) {
  switch (category) {
    case "appliances":
      return appliances
    case "arts":
      return arts
    case "books":
      return books
    case "computers":
      return computers
    case "clothing":
      return clothing
    case "electronics":
      return electronics
    case "games":
      return games
    case "home":
      return home
    default:
  }
}

export default Detail