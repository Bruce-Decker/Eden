import React, { Component } from 'react';
import star from '../../images/rating.png'

import { BrowserRouter as Route, Link } from 'react-router-dom';
import CartAddButton from '../cart/CartAddButton';

class Item extends Component {
  
  constructor() {
     super()
  }

  

  render() {
    return (
      <div>
        <div className="items-row">
          <div className="row">
              <div className="col-4" style={{backgroundColor: "#f2ffea", textAlign: "center", lineHeight: "275px"}}>

                 <Link to={"/items/" + this.props.item.item_id}>                       
                        <img key={this.props.item.item_id} src= {this.props.item.item_image} alt="Rating" style={{width: "250px", height: "250px"}}/>                      
                  </Link>

              </div>
            <div className="col-8">
            
              <Link to={"/items/" + this.props.item.item_id} style={{textDecoration: "none"}}>
                <div className="items-name">{this.props.item.item_name}</div>
              </Link>
              <div>
                {Array.from(Array(this.props.item.average_rating), (e, i) => {
                  return <img key={i} src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                })}
              </div>
              <div className="items-price">Price: ${this.props.item.price}</div>
              {this.props.item.bid_price ? 
                  <div className="items-price">Bid Price: ${this.props.item.bid_price}</div>
                  : null }
              <div className="items-description">Description: {this.props.item.description}</div>
              <div>
                <CartAddButton item={this.props.item} cls={"addtocart-btn-lg"}/>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
    )
  }

}

export default Item;