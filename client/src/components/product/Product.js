import React, { Component } from 'react';
import './Product.css';
import RegularBanner from '../banner/RegularBanner';
import Category from './Category';
import Scroller from './Scroller';

import { BrowserRouter as Route, Link } from 'react-router-dom';

const categories = ['Appliances', 'Arts', 'Books', 'Clothing', 'Computers', 'Electronics', 'Games', 'Home']

class Product extends Component {
    render() {
      return (
        <div>
            <RegularBanner />
            <div>
              <Scroller header="Recommended for you"/>
              <Scroller header="Bestsellers"/>
              <Scroller header="Today's deals"/>
              <div class="product-container">
                <div class="product-header">Categories</div>
                <div class="row" style={{marginLeft: "0.6rem", marginRight: "0.2rem"}}>
                  {/* {Array.from(Array(6), (e, i) => {
                    return  <Category key={i} name={categories[i]}/>
                  })} */}
                   {categories.map(category => {
                      return  <Category name={category}/>
                   })}
                </div>
               
              </div>
            </div>
        </div>
      );
    }
}


export default Product;