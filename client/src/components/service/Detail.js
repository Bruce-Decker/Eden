import React, { Component } from 'react';
import './Service.css';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';
import { Card, Row, Col, Carousel } from 'react-bootstrap';
import Review from './Review';
import Write from './Write';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';

import star from '../../images/rating.png'
import star_half from '../../images/rating_half.png'
import star_zero from '../../images/rating_zero.png'
import email from '../../images/email.png'
import phone from '../../images/phone.png'
import map from '../../images/map.png'
import write from '../../images/write.png'

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
      hasMore: true,
      comments: [],
      write: false,
      map: "none"
    }
    this.page = 0
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
                      <div style={{display: this.state.map, animation: "0.25s fadein"}}>
                        <Map 
                          map={this.map}
                          lat={this.state.service.lat}
                          lng={this.state.service.lng}
                        />
                      </div>
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
            <Row>
              <Col>
                <div style={{marginTop: "3rem", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem"}}>Reviews</div>
              </Col>
              <Col>
                <img src={write} alt="write" className="service-write-button" onClick={() => this.setState({ write: true })}/>
              </Col>
            </Row>
            <div style={{width: "600px", marginLeft: "auto", marginRight: "auto"}}>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadReviews}
                hasMore={this.state.hasMore}
                threshold={50}
                loader={<Spinner style={{width: "35px", height: "35px", position: "absolute", left: "50%"}} animation="border" variant="success" />}
              >
                {Array.from(this.state.comments, (e, i) => {
                  return  <div key={i} style={{marginBottom: "2rem"}}>
                            <Review 
                              id={i}
                              user_name={this.props.auth.user.name}
                              comment={e}
                              handleLike={this.handleLike}
                              handleDislike={this.handleDislike}
                            />
                          </div>
                })}
              </InfiniteScroll>
              <Write 
                id={this.state.service.id}
                auth={this.props.auth}
                show={this.state.write}
                name={this.state.service.name}
                handleClose={this.handleClose}
              />
            </div>
          </div>:
          <Spinner style={{width: "50px", height: "50px", position: "absolute", top: "50%", left: "50%"}} animation="border" variant="success" />
        }
        {!this.state.hasMore && <Footer />}
      </div>
    )
  }

  loadReviews = () => {
    const itemsPerPage = 15
    var comments = []
    var i;
    for (i = 0; i < itemsPerPage; i++) {
      const index = this.page * itemsPerPage + i
      comments.push(this.state.service.reviews.comments[index])
      if (index >= this.state.service.reviews.comments.length - 1) {
        this.setState({ hasMore: false })
        break
      }
    }
    this.setState({ comments: [...this.state.comments.concat(comments)] })
    this.page += 1
  }

  async componentWillMount() {
    const response = await axios.get('/services/' + this.props.match.params.id)
    response.data[0].reviews.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.setState({ service: response.data[0], loading: false })
  }

  componentDidMount() {
    setTimeout(() => this.setState({ map: "block" }), 750)
  }

  handleDislike = (id, key) => {
    var { service, comments } = this.state
    var state = this
    if (this.props.auth.isAuthenticated) {
      axios.post('/services/' + this.props.match.params.id + '/comments/' + id + '/downvote', {
        user_name: this.props.auth.user.name
      }).then(function (response) {
        state.handleResponse(response, service, comments, state, key)
      })
      .catch(function (error) {
        console.log(error);
        window.alert('An error occurred, please try again later.')
      });
    } else {
      window.alert('Please log in and try again.')
    }
  }

  handleLike = (id, key) => {
    var { service, comments } = this.state
    var state = this
    if (this.props.auth.isAuthenticated) {
      axios.post('/services/' + this.props.match.params.id + '/comments/' + id + '/upvote', {
        user_name: this.props.auth.user.name
      }).then(function (response) {
        state.handleResponse(response, service, comments, state, key)
      })
      .catch(function (error) {
        console.log(error);
        window.alert('An error occurred, please try again later.')
      });
    } else {
      window.alert('Please log in and try again.')
    }
  }

  handleResponse = (response, service, comments, state, key) => {
    service.reviews.comments[key] = response.data.comment
    comments[key] = response.data.comment
    state.setState({ service: service, comments: comments })
  }

  handleClose = () => {
    this.setState({ write: false })
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