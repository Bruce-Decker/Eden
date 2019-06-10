import React, { Component } from 'react';
import './Property.css';
import RegularBanner from '../banner/RegularBanner';
import Filter from './Filter'
import Detail from './Detail'
import Control from './Control'

import { connect } from 'react-redux'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import { Spinner } from 'react-bootstrap';

import icon from '../../images/msg.png'

import { getProperties } from '../../redux/actions/PropertyActions'

/* eslint-disable no-undef */

var Map;
// const icon = 'http://maps.google.com/mapfiles/ms/icons/green.png'
const default_lat = 37.3351874
const default_lng = -121.8810715
const mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.31&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '100vh' }} />,
  mapElement: <div style={{ height: '100%' }} />,
}
class Property extends Component {
  constructor(props){
    super(props)
    this.map = React.createRef()
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleError = this.handleError.bind(this);

    this.state = {
      show: false,
      isMarkerShown: true,
      update: true,
      lat: default_lat, 
      lng: default_lng,
      center: [default_lat, default_lng],
      property: null,
      loading: true
    };

    Map = compose(
      withProps(mapAttributes),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        ref={props.map}
        defaultZoom={16}
        center={{ lat: props.centerlat, lng: props.centerlng}}
        options={{
          gestureHandling: 'greedy',
          disableDefaultUI: true
        }}
        onCenterChanged={props.handleCenterChanged}
      >
        <Control position={google.maps.ControlPosition.CENTER}>
          {this.state.loading ? (<Spinner style={{width: "50px", height: "50px"}} animation="border" variant="success" />):(null)}
        </Control>
        <Marker position={{ lat: props.poslat, lng: props.poslng }} />
        {Array.from(props.properties, (e, i) => {
          const price = formatPrice(props.properties[i].price)
          const lat = props.properties[i].lat
          const lng = props.properties[i].lng
          return <Marker key={i} icon={icon} label={{
                    text: price,
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    color: "white",
                    fontWeight: "bold"
                  }}
                  position={{ lat: lat, lng: lng }} onClick={() => props.handleMarkerClick(i)} />
        })}
      </GoogleMap>
    )
  }

  setCurrentPosition = (position) => {
    var { lat, lng } = this.state;
    lat = position.coords.latitude
    lng = position.coords.longitude
    this.setState({ lat: lat, lng: lng })
    this.setCenter(lat, lng)
  }

  setCenter = (lat, lng) => {
    var { center, loading } = this.state;
    center[0] = lat
    center[1] = lng
    loading = false;
    this.setState({ center, loading })
    setTimeout(() => {
      this.search(0, 0, 'houses', 'sale')
    }, 1000)
  }

  handleCenterChanged = () => {
    const { center } = this.state;
    center[0] = this.map.current.getCenter().lat()
    center[1] = this.map.current.getCenter().lng()
    this.setState({ center })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleError = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      var { loading } = this.state;
      loading = false;
      this.setState({ loading })
      setTimeout(() => {
        this.search(0, 0, 'houses', 'sale')
      }, 1000)
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.setCurrentPosition, this.handleError);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  handleMarkerClick = (key) => {
    var { property } = this.state;
    property = this.props.properties[key]
    this.setState({ property });
    this.handleShow();
  }

  search = (price, bed, type, listing) => {
    const bounds = this.map.current.getBounds()
    const nelat = bounds.na.l
    const nelng = bounds.ga.l
    const swlat = bounds.na.j
    const swlng = bounds.ga.j
    this.props.getProperties(nelat, swlat, nelng, swlng, price, bed, type, listing)
  }

  render() {
    return (
      <div>
        <RegularBanner />
        <Filter 
          search={this.search}
          setCenter={this.setCenter}
        />
        <Detail 
          show={this.state.show}
          handleClose={this.handleClose}
          property={this.state.property}
        />
        <Map 
          map={this.map}
          centerlat={this.state.center[0]}
          centerlng={this.state.center[1]}
          poslat={this.state.lat}
          poslng={this.state.lng}
          properties={this.props.properties}
          handleMarkerClick={this.handleMarkerClick}
          handleCenterChanged={this.handleCenterChanged}
        />
      </div>
    )
  }
}

const formatPrice = (price) => {
  var priceStr = price.toString()
  const length = priceStr.length
  if (length > 5) return '$' + priceStr.slice(0, 3) +'k'
  else if (length === 5) return '$' + priceStr.slice(0, 2) + '.' + priceStr[2] + 'k'
  else if (length === 4) return '$' + priceStr[0] + '.' + priceStr[1] + 'k'
  return '$' + priceStr
}

const mapDispatchToProps = dispatch => {
  return({
    getProperties: (nelat, swlat, nelng, swlng, price, bed, type, listing) => {
      dispatch(getProperties(nelat, swlat, nelng, swlng, price, bed, type, listing))
    }
  })
};

function mapStateToProps(state) {
  return {
    properties: state.property.data
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);