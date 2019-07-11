import React, { Component } from 'react';
import RegularBanner from '../banner/RegularBanner';
import { Modal, Row, Col } from 'react-bootstrap';
import './Service.css';

import axios from 'axios'
import { connect } from 'react-redux'
import { BrowserRouter as Route, Link } from 'react-router-dom';

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
import add from '../../images/add.png';
import burger from '../../images/burger.png';
import star from '../../images/rating.png'
import star_half from '../../images/rating_half.png'
import star_zero from '../../images/rating_zero.png'

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
var List;
class Service extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: false,
      add: false,
      services: []
    }

    List = props => 
      <Modal show={props.show} onExited={() => window.scrollTo(0, 0)} scrollable>
        <div style={{backgroundColor: "#53b46e", color: "white"}}>
          <Modal.Header>
            <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
              Your services
            </Modal.Title>
          </Modal.Header>
        </div>
        {props.services.length > 0 ? 
        (
          <Modal.Body style={{paddingTop: "0", paddingBottom: "0", maxWidth: "100%", overflowX: "hidden"}}>
            {Array.from(props.services, (e, i) => {
              const service = props.services[i]
              return  <Link to={'/services/' + service._id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
                        <Row className="service-list" style={{borderBottom: "1px solid #dee2e6", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                          <Col xs={9}>
                            <div style={{fontWeight: "600", color: "black"}}>
                              {service.name}
                            </div>
                          </Col>
                          <Col style={{float: "right", marginLeft: "0.25rem"}}>
                            {Array.from(Array(5), (e, i) => {
                              return <img key={i} src={this.getRatingImage(service.rating - i)} alt="Rating" style={{width: "18px", height: "18px", paddingBottom: "0.225rem", paddingLeft: "0.225rem"}}></img>
                            })}
                          </Col>
                        </Row>
                      </Link>
            })}
          </Modal.Body>
        ) :
        (
          <Modal.Body style={{borderBottom: "1px solid #dee2e6", maxWidth: "100%", overflowX: "hidden"}}>
            <div style={{fontWeight: "600", textAlign: "center", marginTop: "8rem", marginBottom: "8rem"}}>
              You have no listed services.
            </div>
          </Modal.Body>
        )}
        <Modal.Footer style={{display: "inline", borderTop: "none"}}>
          <Row style={{height: "40px"}}>
            <Col style={{display: "grid"}}>
            </Col>
            <Col style={{display: "grid"}}>
              <button className="property-close-button" onClick={props.handleClose}>
                Close
              </button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
  }

  render() {
    return (
      <div>
        <RegularBanner />
        <div style={{width: "1000px", marginLeft: "auto", marginRight: "auto"}}>
          <div style={{marginTop: "1.5rem", marginBottom: "1.5rem", display: "flex"}}>
            <span style={{marginRight: "auto", width: "55px"}}></span>
            <span className="service-title">Services</span>
            <span style={{marginLeft: "auto", width: "55px", paddingTop: "7px"}}>
              <img src={add} alt="add" style={{width: "22px", height: "22px", marginRight: "0.5rem", cursor: "pointer"}} onClick={() => this.setState({add: true})}></img>
              <img src={burger} alt="burger" style={{width: "26px", height: "26px", cursor: "pointer"}} onClick={() => this.setState({list: true})}></img>
            </span>
          </div>
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
        <List 
          show={this.state.list}
          services={this.state.services}
          handleClose={() => this.setState({list: false})}
        />
        <Footer />
      </div>
    );
  }

  componentWillMount() {
    this.getServices()
  }

  async getServices() {
    const response = await axios.get('/services?user_name=' + this.props.auth.user.name)
    var { services } = this.state;
    services = response.data
    this.setState({ services })
  }

  getRatingImage = (rating) => {
    if (rating <= 0) {
      return star_zero
    } else if (rating < 0.5) {
      return star_half
    }
    return star
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Service);