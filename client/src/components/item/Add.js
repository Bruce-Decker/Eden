import React from 'react';
import './Detail'

import { connect } from 'react-redux'
import { addToCart } from '../../redux/actions/CartActions'


const Add = ({ dispatch }) => {
  return (
    <button class="item-add-button" 
            onClick={e => {
              e.preventDefault()
              dispatch(addToCart(parseInt(Math.random() * 10))) // test several ids
            }}>Add to cart</button>
  )
}

export default connect()(Add)