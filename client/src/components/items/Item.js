import React, { Component } from 'react';
import star from '../../images/rating.png'

import { BrowserRouter as Route, Link } from 'react-router-dom';
import CartAddButton from '../cart/CartAddButton';

import clothingJpg from '../../images/clothing.jpg';
import red_blazer from '../../images/clothing/red_blazer.jpg';
import orange_blazer from '../../images/clothing/red_blazer.jpg';
import yellow_blazer from '../../images/clothing/red_blazer.jpg';
import green_blazer from '../../images/clothing/red_blazer.jpg';
import blue_blazer from '../../images/clothing/blue_blazer.jpg';
import purple_blazer from '../../images/clothing/purple_blazer.jpg';
import pink_blazer from '../../images/clothing/pink_blazer.jpg';
import white_blazer from '../../images/clothing/white_blazer.jpg';
import black_blazer from '../../images/clothing/black_blazer.jpg';
import gray_blazer from '../../images/clothing/gray_blazer.jpg';
import red_sweater from '../../images/clothing/red_sweater.jpg';
import orange_sweater from '../../images/clothing/red_sweater.jpg';
import yellow_sweater from '../../images/clothing/red_sweater.jpg';
import green_sweater from '../../images/clothing/red_sweater.jpg';
import blue_sweater from '../../images/clothing/blue_sweater.jpg';
import purple_sweater from '../../images/clothing/purple_sweater.jpg';
import pink_sweater from '../../images/clothing/pink_sweater.jpg';
import white_sweater from '../../images/clothing/white_sweater.jpg';
import black_sweater from '../../images/clothing/black_sweater.jpg';
import gray_sweater from '../../images/clothing/gray_sweater.jpg';
import red_jacket from '../../images/clothing/red_jacket.jpg';
import orange_jacket from '../../images/clothing/red_jacket.jpg';
import yellow_jacket from '../../images/clothing/red_jacket.jpg';
import green_jacket from '../../images/clothing/red_jacket.jpg';
import blue_jacket from '../../images/clothing/blue_jacket.jpg';
import purple_jacket from '../../images/clothing/purple_jacket.jpg';
import pink_jacket from '../../images/clothing/pink_jacket.jpg';
import white_jacket from '../../images/clothing/white_jacket.jpg';
import black_jacket from '../../images/clothing/black_jacket.jpg';
import gray_jacket from '../../images/clothing/gray_jacket.jpg';
import red_hoodie from '../../images/clothing/red_hoodie.jpg';
import orange_hoodie from '../../images/clothing/red_hoodie.jpg';
import yellow_hoodie from '../../images/clothing/red_hoodie.jpg';
import green_hoodie from '../../images/clothing/red_hoodie.jpg';
import blue_hoodie from '../../images/clothing/blue_hoodie.jpg';
import purple_hoodie from '../../images/clothing/purple_hoodie.jpg';
import pink_hoodie from '../../images/clothing/pink_hoodie.jpg';
import white_hoodie from '../../images/clothing/white_hoodie.jpg';
import black_hoodie from '../../images/clothing/black_hoodie.jpg';
import gray_hoodie from '../../images/clothing/gray_hoodie.jpg';
import red_pants from '../../images/clothing/red_pants.jpg';
import orange_pants from '../../images/clothing/red_pants.jpg';
import yellow_pants from '../../images/clothing/red_pants.jpg';
import green_pants from '../../images/clothing/red_pants.jpg';
import blue_pants from '../../images/clothing/blue_pants.jpg';
import purple_pants from '../../images/clothing/purple_pants.jpg';
import pink_pants from '../../images/clothing/pink_pants.jpg';
import white_pants from '../../images/clothing/white_pants.jpg';
import black_pants from '../../images/clothing/black_pants.jpg';
import gray_pants from '../../images/clothing/gray_pants.jpg';
import red_shorts from '../../images/clothing/red_shorts.jpg';
import orange_shorts from '../../images/clothing/red_shorts.jpg';
import yellow_shorts from '../../images/clothing/red_shorts.jpg';
import green_shorts from '../../images/clothing/red_shorts.jpg';
import blue_shorts from '../../images/clothing/blue_shorts.jpg';
import purple_shorts from '../../images/clothing/purple_shorts.jpg';
import pink_shorts from '../../images/clothing/pink_shorts.jpg';
import white_shorts from '../../images/clothing/white_shorts.jpg';
import black_shorts from '../../images/clothing/black_shorts.jpg';
import gray_shorts from '../../images/clothing/gray_shorts.jpg';
import red_sweatpants from '../../images/clothing/red_sweatpants.jpg';
import orange_sweatpants from '../../images/clothing/red_sweatpants.jpg';
import yellow_sweatpants from '../../images/clothing/red_sweatpants.jpg';
import green_sweatpants from '../../images/clothing/red_sweatpants.jpg';
import blue_sweatpants from '../../images/clothing/blue_sweatpants.jpg';
import purple_sweatpants from '../../images/clothing/purple_sweatpants.jpg';
import pink_sweatpants from '../../images/clothing/pink_sweatpants.jpg';
import white_sweatpants from '../../images/clothing/white_sweatpants.jpg';
import black_sweatpants from '../../images/clothing/black_sweatpants.jpg';
import gray_sweatpants from '../../images/clothing/gray_sweatpants.jpg';
import red_cardigan from '../../images/clothing/red_cardigan.jpg';
import orange_cardigan from '../../images/clothing/red_cardigan.jpg';
import yellow_cardigan from '../../images/clothing/red_cardigan.jpg';
import green_cardigan from '../../images/clothing/red_cardigan.jpg';
import blue_cardigan from '../../images/clothing/blue_cardigan.jpg';
import purple_cardigan from '../../images/clothing/purple_cardigan.jpg';
import pink_cardigan from '../../images/clothing/pink_cardigan.jpg';
import white_cardigan from '../../images/clothing/white_cardigan.jpg';
import black_cardigan from '../../images/clothing/black_cardigan.jpg';
import gray_cardigan from '../../images/clothing/gray_cardigan.jpg';
import red_vest from '../../images/clothing/red_vest.jpg';
import orange_vest from '../../images/clothing/red_vest.jpg';
import yellow_vest from '../../images/clothing/red_vest.jpg';
import green_vest from '../../images/clothing/red_vest.jpg';
import blue_vest from '../../images/clothing/blue_vest.jpg';
import purple_vest from '../../images/clothing/purple_vest.jpg';
import pink_vest from '../../images/clothing/pink_vest.jpg';
import white_vest from '../../images/clothing/white_vest.jpg';
import black_vest from '../../images/clothing/black_vest.jpg';
import gray_vest from '../../images/clothing/gray_vest.jpg';
import red_jeans from '../../images/clothing/red_jeans.jpg';
import orange_jeans from '../../images/clothing/red_jeans.jpg';
import yellow_jeans from '../../images/clothing/red_jeans.jpg';
import green_jeans from '../../images/clothing/red_jeans.jpg';
import blue_jeans from '../../images/clothing/blue_jeans.jpg';
import purple_jeans from '../../images/clothing/purple_jeans.jpg';
import pink_jeans from '../../images/clothing/pink_jeans.jpg';
import white_jeans from '../../images/clothing/white_jeans.jpg';
import black_jeans from '../../images/clothing/black_jeans.jpg';
import gray_jeans from '../../images/clothing/gray_jeans.jpg';

class Item extends Component {
  

  render() {
    return (
      <div>
        <div className="items-row">
          <div className="row">
              <div className="col-4" style={{textAlign: "center", lineHeight: "275px"}}>

                 <Link to={"/items/" + this.props.item.item_id}>                       
                        <img 
                          key={this.props.item.item_id} 
                          src= {getImage(this.props.item.item_name, this.props.item.category)} 
                          alt="Rating" 
                          style={{width: "250px", height: "250px"}}
                          onError={(e)=>{e.target.onerror=null; e.target.src=getImage(this.props.item.item_name, this.props.item.category)}}
                        />
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

function getImage(name, category) {
  console.log(name);
  console.log(category);
  let m = {
    'red_blazer': red_blazer,
    'orange_blazer': orange_blazer,
    'yellow_blazer': yellow_blazer,
    'green_blazer': green_blazer,
    'blue_blazer': blue_blazer,
    'purple_blazer': purple_blazer,
    'pink_blazer': pink_blazer,
    'white_blazer': white_blazer,
    'black_blazer': black_blazer,
    'gray_blazer': gray_blazer,
    'red_sweater': red_sweater,
    'orange_sweater': orange_sweater,
    'yellow_sweater': yellow_sweater,
    'green_sweater': green_sweater,
    'blue_sweater': blue_sweater,
    'purple_sweater': purple_sweater,
    'pink_sweater': pink_sweater,
    'white_sweater': white_sweater,
    'black_sweater': black_sweater,
    'gray_sweater': gray_sweater,
    'red_jacket': red_jacket,
    'orange_jacket': orange_jacket,
    'yellow_jacket': yellow_jacket,
    'green_jacket': green_jacket,
    'blue_jacket': blue_jacket,
    'purple_jacket': purple_jacket,
    'pink_jacket': pink_jacket,
    'white_jacket': white_jacket,
    'black_jacket': black_jacket,
    'gray_jacket': gray_jacket,
    'red_hoodie': red_hoodie,
    'orange_hoodie': orange_hoodie,
    'yellow_hoodie': yellow_hoodie,
    'green_hoodie': green_hoodie,
    'blue_hoodie': blue_hoodie,
    'purple_hoodie': purple_hoodie,
    'pink_hoodie': pink_hoodie,
    'white_hoodie': white_hoodie,
    'black_hoodie': black_hoodie,
    'gray_hoodie': gray_hoodie,
    'red_pants': red_pants,
    'orange_pants': orange_pants,
    'yellow_pants': yellow_pants,
    'green_pants': green_pants,
    'blue_pants': blue_pants,
    'purple_pants': purple_pants,
    'pink_pants': pink_pants,
    'white_pants': white_pants,
    'black_pants': black_pants,
    'gray_pants': gray_pants,
    'red_shorts': red_shorts,
    'orange_shorts': orange_shorts,
    'yellow_shorts': yellow_shorts,
    'green_shorts': green_shorts,
    'blue_shorts': blue_shorts,
    'purple_shorts': purple_shorts,
    'pink_shorts': pink_shorts,
    'white_shorts': white_shorts,
    'black_shorts': black_shorts,
    'gray_shorts': gray_shorts,
    'red_sweatpants': red_sweatpants,
    'orange_sweatpants': orange_sweatpants,
    'yellow_sweatpants': yellow_sweatpants,
    'green_sweatpants': green_sweatpants,
    'blue_sweatpants': blue_sweatpants,
    'purple_sweatpants': purple_sweatpants,
    'pink_sweatpants': pink_sweatpants,
    'white_sweatpants': white_sweatpants,
    'black_sweatpants': black_sweatpants,
    'gray_sweatpants': gray_sweatpants,
    'red_cardigan': red_cardigan,
    'orange_cardigan': orange_cardigan,
    'yellow_cardigan': yellow_cardigan,
    'green_cardigan': green_cardigan,
    'blue_cardigan': blue_cardigan,
    'purple_cardigan': purple_cardigan,
    'pink_cardigan': pink_cardigan,
    'white_cardigan': white_cardigan,
    'black_cardigan': black_cardigan,
    'gray_cardigan': gray_cardigan,
    'red_vest': red_vest,
    'orange_vest': orange_vest,
    'yellow_vest': yellow_vest,
    'green_vest': green_vest,
    'blue_vest': blue_vest,
    'purple_vest': purple_vest,
    'pink_vest': pink_vest,
    'white_vest': white_vest,
    'black_vest': black_vest,
    'gray_vest': gray_vest,
    'red_jeans': red_jeans,
    'orange_jeans': orange_jeans,
    'yellow_jeans': yellow_jeans,
    'green_jeans': green_jeans,
    'blue_jeans': blue_jeans,
    'purple_jeans': purple_jeans,
    'pink_jeans': pink_jeans,
    'white_jeans': white_jeans,
    'black_jeans': black_jeans,
    'gray_jeans': gray_jeans,
  };

  let a = name.split(' ');
  let k = 'blah';
  if(a.length === 3) {
    k = a[1] + '_' + a[2];
  }
  if(k in m) {
    return m[k];
  } else {
    return clothingJpg;
  }
}

export default Item;