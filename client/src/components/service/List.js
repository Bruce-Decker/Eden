import React, { Component } from 'react';
import './Service.css';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';
import Item from './Item';

import axios from 'axios'

import { Card, Row, Col, Modal, Form } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";
import { Spinner } from 'react-bootstrap';

import hammer from '../../images/hammer.png';
import shovel from '../../images/shovel.png';
import plug from '../../images/plug.png';
import key from '../../images/key.png';
import broom from '../../images/broom.png';
import mover from '../../images/mover.png';
import ac from '../../images/ac.png';
import tap from '../../images/tap.png';
import map from '../../images/map.png';

var Map
const default_lat = 37.3351874
const default_lng = -121.8810715
const mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.31&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: '400px' }} />,
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '400px' }} />,
}
class List extends Component {
  constructor(props) {
    super(props)

    this.map = React.createRef()
    this.state = {
      lat: default_lat, 
      lng: default_lng,
      show: false,
      loading: true,
    }
    this.search = this.search.bind(this)

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

  setCurrentPosition = (position) => {
    var { lat, lng, loading, show } = this.state;
    lat = position.coords.latitude
    lng = position.coords.longitude
    loading = false
    show = true
    this.setState({ lat: lat, lng: lng, loading, show })
  }

  handleError = (error) => {
    var { show, loading } = this.state;
    show = true
    loading = false;
    this.setState({ show, loading })
  }

  async search () {
    this.setState({ loading: true, show: false })
    const bounds = this.map.current.getBounds()
    const nelat = bounds.na.l
    const nelng = bounds.ga.l
    const swlat = bounds.na.j
    const swlng = bounds.ga.j
    const params =  'nelat=' + nelat +
                    '&swlat=' + swlat +
                    '&nelng=' + nelng +
                    '&swlng=' + swlng +
                    '&category=' + this.props.match.params.category
    const response = await axios.get('/properties?' + params)
    var { services, loading } = this.state;
    services = response.data
    loading = false
    this.setState({ services, loading })
  }


  handleAddressChanged = (target) => {
    const input = document.getElementById("service-map-address").value
    if (input !== ''){
      Geocode.fromAddress(input).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({ lat: lat, lng: lng })
        },
        error => {
          console.error(error);
        }
      );   
    } 
  }

  async componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.setCurrentPosition, this.handleError, { timeout:10000 });
  }
  
  render() {
    const category = this.props.match.params.category
    return (
      <div>
        <RegularBanner />
        <div style={{width: "700px", marginLeft: "auto", marginRight: "auto"}}>
          <div className="service-category-title">
            <img src={getImage(category)} alt="category" className="service-category-img"></img>
            {category !== "havc" ? 
              (category.charAt(0).toUpperCase() + category.slice(1)):
              (category.toUpperCase())
            }
            <img src={map} alt="map" className="service-map" onClick={() => this.setState({show: true})}></img>
          </div>
          <Modal show={this.state.show} onExited={() => window.scrollTo(0, 0)} scrollable>
            <div style={{backgroundColor: "#53b46e", color: "white"}}>
              <Modal.Header>
                <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
                  Services in your neighborhood
                </Modal.Title>
              </Modal.Header>
            </div>
            <Modal.Body>
              <input type="text" id="service-map-address"  placeholder="Search Google Maps" onChange={this.handleAddressChanged}></input>
              <div style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}>
                <Map
                  map={this.map}
                  lat={this.state.lat}
                  lng={this.state.lng}
                >
                </Map>
              </div>
              <Form.Text className="text-muted">
                Drag the map to locate the area.
              </Form.Text>
            </Modal.Body>
            <Modal.Footer style={{display: "inline"}}>
              <Row style={{height: "40px"}}>
                <Col style={{display: "grid"}}>
                  <button className="service-button" onClick={this.search}>
                    Search
                  </button>
                </Col>
                <Col style={{display: "grid"}}>
                  <button className="service-button" onClick={() => this.setState({show: false})}>
                    Close
                  </button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>
          {Array.from(Array(5), (_, i) => {
            return  <div style={{marginBottom: "2.5rem"}}>
                      <Item />
                    </div>
          })}
          {this.state.loading ? (<Spinner style={{width: "50px", height: "50px", position: "absolute", top: "50%", left: "50%"}} animation="border" variant="success" />):(null)}
        </div>
        <Footer />
      </div>
    )
  }
}

function getImage(category) {
  switch (category) {
    case "contractors":
      return hammer
    case "landscaping":
      return shovel
    case "electricians":
      return plug
    case "locksmiths":
      return key
    case "cleaners":
      return broom
    case "movers":
      return mover
    case "havc":
      return ac
    case "plumbers":
      return tap
    default:
  }
}


export default List;