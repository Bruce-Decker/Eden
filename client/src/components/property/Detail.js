import React, { Component } from 'react';
import './Property.css';
import { Modal, Carousel, Row, Col } from 'react-bootstrap';

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
    if (this.props.property != null) {
      const price = format(this.props.property.price)
      const space = format(this.props.property.space)
      return (
        <div ref={node => this.node = node}>
          <Modal show={this.props.show} onExited={() => window.scrollTo(0, 0)} scrollable>
            <div style={{backgroundColor: "#53b46e", color: "white"}}>
              <Modal.Header style={{borderBottom: "0", paddingBottom: "0.25rem"}}>
                <Modal.Title>${price}</Modal.Title>
                <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
                  {this.props.property.num_bed} bd | {this.props.property.num_bath}  ba | {space} sqft
                </Modal.Title>
              </Modal.Header>
              <Modal.Header style={{paddingTop: "0.25rem", paddingBottom: "0.5rem"}}>
                <h6>{this.props.property.address}, {this.props.property.city}, {this.props.property.state} {this.props.property.zip}</h6>
              </Modal.Header>
            </div>
            {this.props.property.images.length > 0 ?
              (<div>
                <Modal.Body>
                  <Carousel>
                    {Array.from(this.props.property.images, (e, i) => {
                      return <Carousel.Item key={i}>
                              <img
                                className="d-block w-100 property-image"
                                src={'/images/property/' + this.props.property.id + '/' + this.props.property.images[i]}
                                alt={i}
                              />
                            </Carousel.Item>
                    })}
                  </Carousel>
                </Modal.Body>
                <Modal.Body style={{paddingTop: "0"}}>
                  {this.props.property.desc}
                </Modal.Body>
              </div>) :
              (<Modal.Body>
                {this.props.property.desc}
              </Modal.Body>)
            }
            <Modal.Footer style={{display: "inline"}}>
              <Row>
                <Col xs={6} style={{height: "40px"}}>
                  <h6>
                    <img alt="email" className="property-contact-icon" src={email}/>
                    {this.props.property.email}
                  </h6>
                  <h6 style={{marginLeft: "0"}}>
                    <img alt="phone" className="property-contact-icon"  src={phone}/>
                    {this.props.property.phone}
                  </h6>
                </Col>
                {this.props.auth.user.name === this.props.property.user_name &&
                  <Col style={{display: "grid"}}>
                    <button className="property-delete-button" onClick={() => this.props.handleDelete(this.props.auth.user.id, this.props.property.id)}>
                      Delete
                    </button>
                  </Col>
                }
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
    return null
  }
}

function format(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Detail;