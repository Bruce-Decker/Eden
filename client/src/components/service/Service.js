import React, { Component } from 'react';
import RegularBanner from '../banner/RegularBanner';
import { Row, Col } from 'react-bootstrap';
import './Service.css';

import Category from './Category';
import Footer from '../footer/Footer';
import hammer from '../../images/hammer.png';
import shovel from '../../images/shovel.png';
import plug from '../../images/plug.png';
import key from '../../images/key.png';
import broom from '../../images/broom.png';
import mover from '../../images/mover.png';
import ac from '../../images/ac.png';
import tap from '../../images/tap.png';

const categories = {
    images: [hammer, shovel, plug, key, broom, mover, ac, tap],
    services: ['Contractors', 'Landscaping', 'Electricians', 'Locksmiths', 'Cleaners', 'Movers', 'HVAC', 'Plumbers'],
    descriptions: ['Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.',
                   'Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.',
                   'Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.',
                   'Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.',
                   'Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.',
                   'Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.',
                   'Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.',
                   'Spicy jalapeno jowl meatloaf kevin tail pastrami short ribs bresaola sausage.']
}

class Service extends Component {
  
  render() {
    return (
      <div>
        <RegularBanner />
        <div className="service-title">Services</div>
        <div style={{marginLeft: "15rem", marginRight: "15rem"}}>
          {Array.from(Array(4), (_, i) => {
            return  <Row>
                      {Array.from(Array(2), (_, j) => {
                        const index = (i * 2) + j
                        return  <Col style={{paddingBottom: "30px"}}>
                                  <Category img={categories.images[index]} 
                                            service={categories.services[index]} 
                                            desc={categories.descriptions[index]}
                                            bg='#f7f7ff'/>
                                </Col>
                      })}
                    </Row>
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Service;