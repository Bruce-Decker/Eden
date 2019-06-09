import React, { Component } from 'react';
import './Property.css';
import { Modal, Button, Carousel, Row, Col } from 'react-bootstrap';

import { BrowserRouter as Route, Link } from 'react-router-dom';
import home1 from '../../images/home1.jpg'
import home2 from '../../images/home2.jpg'
import home3 from '../../images/home3.jpg'
import email from '../../images/email.png'
import phone from '../../images/phone.png'


class Detail extends Component {

  // componentWillMount() {
  //   document.addEventListener('mousedown', this.handleClick, false);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClick, false);
  // }

  // handleClick = (e) => {
  //   if (this.props.show) {
  //     if (this.node.contains(e.target)) {
  //       return;
  //     }
  //     this.props.handleClose();
  //   }
  // }
  
  render() {
    return (
      <div ref={node => this.node = node}>
        <Modal show={this.props.show} onExited={() => window.scrollTo(0, 0)}>
          <div style={{backgroundColor: "#53b46e", color: "white"}}>
            <Modal.Header style={{borderBottom: "0", paddingBottom: "0.25rem"}}>
              <Modal.Title>$900,000</Modal.Title>
              <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>4 bd | 3  ba | 2,262 sqft</Modal.Title>
            </Modal.Header>
            <Modal.Header style={{paddingTop: "0.25rem", paddingBottom: "0.5rem"}}>
              <h6>6210 Bellhaven Pl, Newark, CA 94560</h6>
            </Modal.Header>
          </div>
          <Modal.Body>
            <Carousel>
              <Carousel.Item>
                <img
                  style={{minWidth: "100%", maxWidth: "100%", minHeight: "300px", maxHeight: "300px"}}
                  className="d-block w-100"
                  src={home1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{minWidth: "100%", maxWidth: "100%", minHeight: "300px", maxHeight: "300px"}}
                  className="d-block w-100"
                  src={home2}
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{minWidth: "100%", maxWidth: "100%", minHeight: "300px", maxHeight: "300px"}}
                  className="d-block w-100"
                  src={home3}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Modal.Body>
          <Modal.Body>
            Lowest priced home of its size in Newark, Shows pride of ownership, not a flip or a staged home. Located a small commute to major Silicon Valley companies. Situated in a kid friendly cul-de-sac tucked in a corner on a huge lot. Home features seven sky lights that flood the house with natural light, crown moldings, two wood burning fire places, exterior has acrylic two- toned stucco, open floor plan, four beds three full baths, a master bedroom down stairs and king master upstairs with spa like bath room, with HD waterproof TV, shower with dual shower heads, Huge walk in closet with additional separate closet space, brand new red wood balcony, granitecounter tops in kitchen,bathroom and outside. The back yard is an entertainers dream with colored stamped concrete, outdoor grill, Tv, separate gated yard with synthetic grass for childs play or dog run, new redwood fence. (Possible rental opportunity with this open yet separate floor plan. Live in back addition of house and rent front part or vice versa)
          </Modal.Body>
          <Modal.Footer style={{display: "inline"}}>
            <Row>
              <Col style={{height: "40px"}}>
                <h6>
                  <img alt="email" style={{maxWidth: "20px", maxHeight: "20px", marginRight: "0.5rem"}} src={email}/>
                  aaa@gmail.com
                </h6>
                <h6 style={{marginLeft: "0"}}>
                  <img alt="phone" style={{maxWidth: "20px", maxHeight: "20px", marginRight: "0.5rem"}} src={phone}/>
                  1111111111
                </h6>
              </Col>
              <Col style={{display: "grid"}}>
                <button className="property-close-button" onClick={this.props.handleClose}>
                  Close
                </button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Detail;