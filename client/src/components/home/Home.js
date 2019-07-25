import React, { Component } from 'react';
import './Home.css';

import Category from '../../components/category/Category';
import product from '../../images/product.png';
import service from '../../images/service.png';
import property from '../../images/property.png';
import food from '../../images/food.png';
import Footer from '../footer/Footer';
import LandingBanner from '../banner/LandingBanner';
import RegularBanner from '../banner/RegularBanner';

class Home extends Component {
  showBanner() {
    // show the appropriate banner if user is logged in
    if(window.localStorage.getItem('jwtToken')) {
      return (<RegularBanner/>);
    } else {
      return (<LandingBanner/>);
    }
  }

  render() {
    
    return (
      <div>
        {this.showBanner()}
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
        <div style={{marginTop: "2rem"}}></div>
        <Footer />
      </div>
    );
  }
}

export default Home;