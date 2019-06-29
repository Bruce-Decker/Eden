import React, { Component } from 'react';
import './Service.css';
import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';
import Item from './Item';

import axios from 'axios'

import { Row, Col, Modal, Form } from 'react-bootstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Geocode from "react-geocode";
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

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
const latBound = 0.11
const lngBound = 0.16
class List extends Component {
  constructor(props) {
    super(props)

    this.map = React.createRef()
    this.state = {
      lat: default_lat, 
      lng: default_lng,
      show: false,
      loading: true,
      services: [],
      activePage: 1,
      itemsPerPage: 0,
      numItems: 0
    }
    this.search = this.search.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

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
    var { lat, lng } = this.state;
    lat = position.coords.latitude
    lng = position.coords.longitude
    this.setState({ lat: lat, lng: lng })
    this.get(lat + latBound, lng + lngBound, lat - latBound, lng - lngBound)
  }

  handleCenterChanged = () => {
    var { lat, lng } = this.state;
    lat = this.map.current.getCenter().lat()
    lng = this.map.current.getCenter().lng()
    this.setState({ lat: lat, lng: lng })
  }

  handleError = (error) => {
    var { show, loading } = this.state;
    show = true
    loading = false;
    this.setState({ show, loading })
  }

  async handlePageChange(pageNumber) {
    window.scrollTo(0, 0);
    this.setState({ loading: true })
    const { lat, lng } = this.state;
    this.get(lat + latBound, lng + lngBound, lat - latBound, lng - lngBound, pageNumber)
  }

  async search () {
    this.setState({ show: false })
    const bounds = this.map.current.getBounds()
    const nelat = bounds.na.l
    const nelng = bounds.ga.l
    const swlat = bounds.na.j
    const swlng = bounds.ga.j
    this.get(nelat, nelng, swlat, swlng)
  }

  async get(nelat, nelng, swlat, swlng, page=1) {
    this.setState({ loading: true, services: [] })
    const params =  'nelat=' + nelat +
                    '&swlat=' + swlat +
                    '&nelng=' + nelng +
                    '&swlng=' + swlng +
                    '&category=' + this.props.match.params.category +
                    '&page=' + page
    const response = await axios.get('/services?' + params)
    this.setState({ 
      services: response.data.services,
      numItems: response.data.numItems,
      itemsPerPage: response.data.itemsPerPage,
      activePage: page,
      loading: false
    })
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
            {category !== "hvac" ? 
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
                  handleCenterChanged={this.handleCenterChanged}
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
          {this.state.loading ? (<Spinner style={{width: "50px", height: "50px", position: "absolute", top: "50%", left: "50%"}} animation="border" variant="success" />):(null)}
          {this.state.services.length !== 0 ? 
            (Array.from(this.state.services, (e, i) => {
              return  <div style={{marginBottom: "2.5rem"}}>
                        <Item 
                          key={i}
                          id={e.id}
                          name={e.name}
                          desc={e.desc}
                          rating={e.rating}
                          phone={e.phone}
                          email={e.email}
                          logo={e.logo}
                        />
                      </div>
            })) :
            this.state.loading ?
            (
              <div style={{height: "100vh"}}/>
            ) :
            (
              <div style={{marginTop: "35vh", marginBottom: "50vh", textAlign: "center", color: "rgb(165, 165, 165)", fontSize: "1.25rem"}}>No services found in this area.</div>
            )
          }
        </div>
        {this.state.services.length !== 0 &&
          <div id='pagination' style={{marginTop: "3rem", marginBottom: "3rem"}}>
            <Pagination
              prevPageText='<'
              nextPageText='>'
              firstPageText='<<'
              lastPageText='>>'
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsPerPage}
              totalItemsCount={this.state.numItems}
              onChange={this.handlePageChange}
              activeClass='service-pn-active'
              activeLinkClass='service-pn-active-link'
              itemClass='service-pn-item'
              itemClassPrev='service-pn-item-prev'
              itemClassNext='service-pn-item-next'
              disabledClass='service-pn-disabled'
            />
          </div>
        }
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
    case "hvac":
      return ac
    case "plumbers":
      return tap
    default:
  }
}


export default List;