import React, { Component } from 'react';
import './Service.css';
import RegularBanner from '../banner/RegularBanner';
import { Card, Row, Col, Carousel } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


import star from '../../images/rating.png'
import email from '../../images/email.png'
import phone from '../../images/phone.png'
import map from '../../images/map.png';

var Map
const default_lat = 37.3351874
const default_lng = -121.8810715
const mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.31&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: '130px' }} />,
  containerElement: <div style={{ height: '130px' }} />,
  mapElement: <div style={{ height: '130px' }} />,
}

class Detail extends Component {
  constructor(props) {
    super(props)

    this.map = React.createRef()
    Map = compose(
      withProps(mapAttributes),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        ref={props.map}
        defaultZoom={11}
        center={{ lat: props.lat, lng: props.lng }}
        options={{
          scrollwheel: false,
          disableDoubleClickZoom: true,
          panControl: false,
          streetViewControl: false,
          gestureHandling: 'greedy',
          disableDefaultUI: true
        }}
        onCenterChanged={props.handleCenterChanged}
      >
      </GoogleMap>
    )
  }


  render() {
    return (
      <div>
        <RegularBanner />
        <div style={{width: "800px", marginLeft: "auto", marginRight: "auto", marginTop: "2.25rem"}}>
          <Row>
            <Col md={7}>
              <div style={{fontWeight: "bold", fontSize: "1.8rem"}}>Future Vision Remodeling</div>
              <div style={{marginBottom: "1.25rem"}}>
                {Array.from(Array(5), (e, i) => {
                  return <img key={i} src={star} alt="Rating" style={{width: "22px", height: "22px"}}></img>
                })}
              </div>
              <div style={{color: "rgb(165, 165, 165)"}}>Future Vision Remodeling, Inc. provides quality service for your home. We pride ourselves on reliability, great communication, integrity and quality work. We take pride in our business by providing you 5 star service.  What makes us different from other companies is that we make sure we show up on time, provide affordable pricing, and honest work. We are here for you to make sure we take care of your heating and cooling systems.</div>
            </Col>
            <Col>
              <Card className="service-list-category" style={{backgroundColor: "#f7f7ff", borderRadius: "1rem", border: "0"}}>
                <Card.Body>
                  <div style={{marginBottom: "0.5rem"}}>
                    <Map />
                  </div>
                  <Card.Text style={{color: "black"}}>
                    <Row>
                      <Col md={1}>
                        <div><img className="service-contact-icon" alt="map" src={map}/></div>
                      </Col>
                      <Col style={{marginTop: "3px"}}>
                        <div>1165 Lincoln Ave Ste 8653</div>
                        <div>San Jose, CA 95125</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={1}>
                        <div><img className="service-contact-icon" alt="phone" src={phone}/></div>
                        <div><img className="service-contact-icon" alt="email" src={email}/></div>
                      </Col>
                      <Col style={{marginTop: "3px"}}>
                        <div>6697581284</div>
                        <div>futurevision@gmail.com</div>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <div style={{marginTop: "2rem"}}>
                <Card className="service-list-category" style={{height: "270px", border: "none"}}>
                  <Carousel>
                    <Carousel.Item style={{height: "270px"}}>
                      <img src={star} className="d-block w-100 service-image"/>
                    </Carousel.Item>
                    <Carousel.Item style={{height: "270px"}}>
                      <img src={star} className="d-block w-100 service-image"/>
                    </Carousel.Item>
                  </Carousel>
                </Card>
              </div>
            </Col>
            <Col>
              <div style={{marginTop: "2rem"}}>
                <Card className="service-list-category" style={{backgroundColor: "#f7f7ff", borderRadius: "1rem", border: "0", height: "270px"}}>
                  <Card.Body>
                    <Card.Title style={{fontWeight: "bold"}}>Services Offered</Card.Title>
                    <Card.Text style={{color: "black"}}>
                      <Row>
                        <Col>
                          <Carousel interval={null}
                            prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon">>>>></span>}
                            nextIcon={<span style={{color: "green"}} />}>
                            {Array.from(Array(2), (e, i) => {
                              return <Carousel.Item key={i} style={{marginBottom: "3rem"}}>
                                      {Array.from(Array(10), (e, i) => {
                                        return  <div>
                                                  <div>Electric Furnace Installation</div>
                                                </div>
                                      })}
                                    </Carousel.Item>
                            })}
                          </Carousel>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
          <div style={{marginTop: "3rem", fontSize: "2rem"}}>
            **REVIEW**
          </div>
        </div>
      </div>
    )
  }
}


export default Detail;