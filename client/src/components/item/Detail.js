import React, { Component } from 'react';
import './Item.css';

import { connect } from 'react-redux'
import { getItem } from '../../redux/actions/ItemActions'

import Add from './Add'
import Try from './Try'
import apple from '../../images/apple.png'
import star from '../../images/rating.png'

// const item = {
//   id: 1,
//   title: 'Apple',
//   by: 'Apple',
//   desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus pumila). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.',
//   rating: [1, 2, 3, 4, 5],
//   price: '$9.99'
// }

class Detail extends Component {

  render() {
    const item = this.props.item.object
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
  componentWillMount() {
    this.props.getItem(this.props.id);
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    getItem: (id) => {
      dispatch(getItem(id))
    }
  })
};

function mapStateToProps(state) {
  return {
    item: state.item
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);