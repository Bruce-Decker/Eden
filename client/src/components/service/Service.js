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
    descriptions: ['Find the best contractors who can finish construction projects swiftly and with high quality.',
                   'Find the best landscapers who can transform your area to restore beauty and utility.',
                   'Find the best electricians who can ensure that power is available and dependable in all areas.',
                   'Find the best locksmiths who can secure your home, personal belongings, and peace of mind.',
                   'Find the best cleaners who can restore spaces to pristine condition, perfect for entertaining.',
                   'Find the best movers who can transport all your belongings in record time and condition.',
                   'Find the best HVAC technicians who can improve the temperature conditions in your workspace.',
                   'Find the best plumbers who can loosen the flow within critical pipes in your network.']
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