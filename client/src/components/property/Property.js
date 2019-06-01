import React, { Component } from 'react';
import './Property.css';
import RegularBanner from '../banner/RegularBanner';
import apple from '../../images/apple.png';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

var Map;
var lat = 37.3391288, lng = -121.88599780000001;
const icon = 'http://maps.google.com/mapfiles/ms/icons/green.png'
class Property extends Component {

  state = {
    isMarkerShown: false,
  }

  setCurrentPosition = (position) => {
    lat = position.coords.latitude
    lng = position.coords.longitude
    console.log(lat, lng)
    this.setMap()
    this.setState({ isMarkerShown: true })
  }

  handleError = (e) => {
    console.log(e)
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.setCurrentPosition, this.handleError, {timeout:10000});
    this.setMap()
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 2500)
  }

  handleMarkerClick = () => {
    // this.setState({ isMarkerShown: false })
    window.alert("Hello World!");
    this.delayedShowMarker()
  }

  setMap = () => {
    Map = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100vh' }} />,
        mapElement: <div style={{ height: '100%' }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: lat, lng: lng }}
        options={{
          // scrollwheel: false
          gestureHandling: 'greedy',
          disableDefaultUI: true
        }}
      >
        {props.isMarkerShown && 
        <Marker position={{ lat: lat, lng: lng }} onClick={props.onMarkerClick} />}
        <Marker icon={icon} position={{ lat: 37.3399406, lng: -121.89599780000001 }} onClick={props.onMarkerClick} />
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
        <Map
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    )
  }
}

export default Property;