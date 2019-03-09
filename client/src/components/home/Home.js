import React, { Component } from 'react';
import './Home.css';

import Category from '../../components/category/Category'
import product from '../../images/product.png'
import service from '../../images/service.png'
import property from '../../images/property.png'
import food from '../../images/food.png'

class Home extends Component {
    render() {
      
      return (
        <div>
          <Category default={true}
                    category="Product" 
                    description="Capicola pancetta hamburger salami biltong chuck. Pastrami flank tail landjaeger ball tip biltong andouille. Tail cow rump salami prosciutto capicola."
                    color="#f2ffea"
                    image={product}></Category>
          <Category category="Service"
                    description="Picanha cow boudin, sirloin shoulder pork belly chicken buffalo corned beef drumstick bresaola chuck beef ribs short ribs biltong."
                    image={service}></Category>
          <Category default={true}
                    category="Property" 
                    description="Venison chicken turducken, brisket pork loin meatloaf alcatra flank. Spare ribs cow venison flank picanha cupim, pancetta frankfurter porchetta shankle andouille."
                    color="#f2ffea"
                    image={property}></Category>
          <Category category="Food"
                    description="Meatloaf sirloin ham tenderloin chuck shoulder ball tip ribeye ham hock leberkas. Tail cow rump salami prosciutto capicola."
                    image={food}></Category>
        </div>
      );
    }
}

export default Home;