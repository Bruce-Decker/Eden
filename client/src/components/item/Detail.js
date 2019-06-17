import React, { Component } from 'react';
import './Item.css';

import axios from 'axios'

import Add from './Add'
import Try from './Try'
import apple from '../../images/apple.png'
import star from '../../images/rating.png'


class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: null
    };
  }

  render() {
    if (this.state.item != null) {
      const item = this.state.item
      return (
        <div class="container-item">
          <div class="row">
          <div class="col-1"/>
          <div class="col-6 align-items-center item-img" style={{paddingLeft: "8vw", paddingRight: "8vw"}}>
            <img src={apple} alt="Item" style={{height: "100%"}}></img>
          </div>
          <div class="col-3" >
            <div class="item-title">
              {item.item_name}
              <span style={{marginLeft: "1rem"}}></span>
              <Try id={item.item_id} ar={item.ar}></Try>
            </div>
            <div class="item-by">unknown</div>
            <div class="item-desc">{item.description}</div>
            <div>
              {Array.from(Array(item.average_rating), (e, i) => {
                return <img key={i} src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
              })}
            </div>
            <div class="item-price">${item.price}</div>
            <div ><Add id={item.item_id}/><span style={{marginLeft: "1rem"}}></span></div>
          </div>
          </div>
          <div class="col-1"/>
        </div>
      );
    } 
    return null
  }  
  async componentWillMount() {
    const response = await axios.get('/items/' + this.props.id)
    this.setState({
        item: response.data[0]
    })
  }
}

export default Detail