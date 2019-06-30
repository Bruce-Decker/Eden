import React, { Component } from 'react';
import './Service.css';
import RegularBanner from '../banner/RegularBanner';
import { Card, Row, Col, Carousel } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Review from './Review';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap';
import axios from 'axios'

import star from '../../images/rating.png'
import star_half from '../../images/rating_half.png'
import star_zero from '../../images/rating_zero.png'
import email from '../../images/email.png'
import phone from '../../images/phone.png'
import map from '../../images/map.png';

var Map
const mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.31&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: '130px' }} />,
  containerElement: <div style={{ height: '130px' }} />,
  mapElement: <div style={{ height: '130px' }} />,
}

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      service: null,
    }
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
          disableDefaultUI: true,
          draggable: false,
          zoomControl: false
        }}
      >
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      </GoogleMap>
    )
  }


  render() {
    return (
      <div>
        <RegularBanner />
        {this.state.service !== null && !this.state.loading? 
          <div style={{width: "800px", marginLeft: "auto", marginRight: "auto", marginTop: "2.25rem", animation: "0.8s fadein"}}>
            <Row>
              <Col md={7}>
                <div style={{fontWeight: "bold", fontSize: "1.8rem"}}>{this.state.service.name}</div>
                <div style={{marginBottom: "1.25rem"}}>
                  {Array.from(Array(5), (e, i) => {
                    console.log(this.state.service.rating - i, this.state.service.rating)
                    return <img key={i} src={this.getRatingImage(this.state.service.rating - i)} alt="Rating" style={{width: "22px", height: "22px", paddingBottom: "0.25rem", paddingRight: "0.25rem"}}></img>
                  })}
                  <span style={{marginLeft: "1rem", color: "#53b46e", fontSize: "1.1rem"}}>{this.state.service.reviews.count} reviews</span>
                </div>
                <div style={{color: "rgb(165, 165, 165)"}}>{this.state.service.desc}</div>
              </Col>
              <Col>
                <Card className="service-list-category" style={{backgroundColor: "#f7f7ff", borderRadius: "1rem", border: "0"}}>
                  <Card.Body>
                    <div style={{marginBottom: "0.5rem", minHeight: "130px"}}>
                      <Map 
                        map={this.map}
                        lat={this.state.service.lat}
                        lng={this.state.service.lng}
                      />
                    </div>
                    <Card.Text style={{color: "black"}}>
                      <Row>
                        <Col md={1}>
                          <div><img className="service-contact-icon" alt="map" src={map}/></div>
                        </Col>
                        <Col style={{marginTop: "3px"}}>
                          <div>{this.state.service.address}</div>
                          <div>{this.state.service.city}, {this.state.service.state} {this.state.service.zip}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={1}>
                          <div><img className="service-contact-icon" alt="phone" src={phone}/></div>
                          <div><img className="service-contact-icon" alt="email" src={email}/></div>
                        </Col>
                        <Col style={{marginTop: "3px"}}>
                          <div>{this.state.service.phone}</div>
                          <div>{this.state.service.email}</div>
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
                  <Card className="service-list-category" style={{border: "none"}}>
                    <Carousel style={{minHeight: "280px"}}>
                      {Array.from(this.state.service.images, (e, i) => {
                        return  <div key={i}>
                                  <Card.Img alt="img" src={'/images/service/' + e} className="d-block w-100 service-image"/>
                                </div>
                      })}
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
                            <Carousel interval={null} style={{minHeight: "230px"}} prevIcon={<span/>} nextIcon={<span/>}>
                              {Array.from(Array(parseInt(this.state.service.services.length / 10) + 1), (e, i) => {
                                return <Carousel.Item key={i}>
                                        {Array.from(Array(10), (e, j) => {
                                          return  <div key={(i * 10) + j}>
                                                    <div>{this.state.service.services[(i * 10) + j]}</div>
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
            <div style={{marginTop: "3rem", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem"}}>Reviews</div>
            <div style={{width: "600px", marginLeft: "auto", marginRight: "auto"}}>
              {Array.from(this.state.service.reviews.comments.reverse(), (e, i) => {
                return  <div key={i} style={{marginBottom: "2rem"}}>
                          <Review 
                            user_name={this.props.auth.user.name}
                            comment={e}
                            handleLike={this.handleLike}
                            handleDislike={this.handleDislike}
                          />
                        </div>
              })}
            </div>
          </div>:
          (<Spinner style={{width: "50px", height: "50px", position: "absolute", top: "50%", left: "50%"}} animation="border" variant="success" />)
        }
      </div>
    )
  }

  async componentWillMount() {
    if (this.props.location.state == null) {
      const response = await axios.get('/services/' + this.props.match.params.id)
      this.setState({ service: response.data[0], loading: false })
      this.state.service.reviews.comments.sort(function(a, b){
        return new Date(b.date) - new Date(a.date);
      });
    } else {
      this.setState({ service: this.props.location.state.service, loading: false })
    }
  }

  handleDislike = () => {

  }

  handleLike = () => {

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

export default connect(mapStateToProps)(Detail);