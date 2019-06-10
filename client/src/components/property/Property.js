import React, { Component } from 'react';
import './Property.css';
import RegularBanner from '../banner/RegularBanner';
import Filter from './Filter'
import Detail from './Detail'

import { connect } from 'react-redux'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

/* eslint-disable no-undef */

var Map;
var lat = 37.3351874, lng = -121.8810715;
const icon = 'http://maps.google.com/mapfiles/ms/icons/green.png'
const mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '100vh' }} />,
  mapElement: <div style={{ height: '100%' }} />,
}
class Property extends Component {
  constructor(props){
    super(props)
    this.map = React.createRef()
    this.handleError = this.handleError.bind(this)
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      isMarkerShown: true,
      center: [lat, lng],
      update: true
    };
  }

  setCurrentPosition = (position) => {
    lat = position.coords.latitude
    lng = position.coords.longitude
    this.setCenter(lat, lng)
    this.setMap()
    this.setState({ update: true })
  }

  setCenter = (lat, lng) => {
    const { center } = this.state;
    center[0] = lat
    center[1] = lng
    this.setState({ center });
    this.setMap()
    this.setState({ update: true })
  }

  handleError = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      this.setState({ update: true })
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.setCurrentPosition, this.handleError);
    this.setMap()
  }

  componentDidMount() {
    // this.delayedShowMarker()
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 2500)
  }

  handleMarkerClick = () => {
    this.handleShow();
  }

  search = () => {
    console.log(this.map.current.getBounds())
  }

  setMap = () => {
    Map = compose(
      withProps(mapAttributes),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        ref={this.map}
        defaultZoom={16}
        center={{ lat: this.state.center[0], lng: this.state.center[1]}}
        options={{
          gestureHandling: 'greedy',
          disableDefaultUI: true
        }}
      >
        <Marker position={{ lat: lat, lng: lng }} />
        <Marker icon={icon} label={{
          text: "$1k",
          fontFamily: "Nunito",
          fontSize: "16px",
          color: "ิblack",
          fontWeight: "bold"
        }} position={{ lat: 37.3399406, lng: -121.89599780000001 }} onClick={props.onMarkerClick} />
        <Marker icon={icon} position={{ lat: 37.3409406, lng: -121.89399780000001 }} onClick={props.onMarkerClick} />
        <Marker icon={icon} position={{ lat: 37.3349406, lng: -121.89199780000001 }} onClick={props.onMarkerClick} />
        <Marker icon={icon} position={{ lat: 37.3359406, lng: -121.87999780000001 }} onClick={props.onMarkerClick} />
        <Marker icon={icon} position={{ lat: 37.3389406, lng: -121.87799780000001 }} onClick={props.onMarkerClick} />
      </GoogleMap>
    )
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
        />
        <Map
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return({
    
  })
};

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);