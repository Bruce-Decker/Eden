import React, { Component } from 'react';
import './Property.css';
import RegularBanner from '../banner/RegularBanner';
import Filter from './Filter'
import Detail from './Detail'
import Control from './Control'
import Upload from './Upload'
import List from './List'

import axios from 'axios'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux'

import { Spinner } from 'react-bootstrap';

import icon_1 from '../../images/property_icon_1.png'
import icon_2 from '../../images/property_icon_2.png'


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
    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
    this.showUploadForm = this.showUploadForm.bind(this);
    this.hideUploadForm = this.hideUploadForm.bind(this);
    this.showPropertyList = this.showPropertyList.bind(this);
    this.hidePropertyList = this.hidePropertyList.bind(this);
    this.handleError = this.handleError.bind(this);
    this.search = this.search.bind(this);
    this.getUserProperties = this.getUserProperties.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.go = this.go.bind(this);

    this.state = {
      detail: false,
      upload: false,
      list: false,
      isMarkerShown: true,
      update: true,
      lat: default_lat, 
      lng: default_lng,
      center: [default_lat, default_lng],
      property: null,
      loading: true,
      properties: [],
      userProperties: [],
      listing: 'sale',
      type: 'houses',
      price: 0,
      bed: 0
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
        onDragEnd={props.onChange}
        onZoomChanged={props.onChange}
      >
        <Control position={google.maps.ControlPosition.CENTER}>
          {this.state.loading ? (<Spinner style={{width: "50px", height: "50px"}} animation="border" variant="success" />):(null)}
        </Control>
        <Marker position={{ lat: props.poslat, lng: props.poslng }} />
        {Array.from(props.userProperties, (e, i) => {
          const price = formatPrice(props.userProperties[i].price)
          const lat = props.userProperties[i].lat
          const lng = props.userProperties[i].lng
          return <Marker key={i} icon={icon_2} label={{
                    text: price,
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    color: "white",
                    fontWeight: "bold"
                  }}
                  position={{ lat: lat, lng: lng }} onClick={() => props.handleUserMarkerClick(i)} />
        })}
        {Array.from(props.properties, (e, i) => {
          if (this.props.auth.user.name !== props.properties[i].user_name) {
            const price = formatPrice(props.properties[i].price)
            const lat = props.properties[i].lat
            const lng = props.properties[i].lng
            return <Marker key={i} icon={icon_1} label={{
                      text: price,
                      fontFamily: "Nunito",
                      fontSize: "14px",
                      color: "white",
                      fontWeight: "bold"
                    }}
                    position={{ lat: lat, lng: lng }} onClick={() => props.handleMarkerClick(i)} />
          }
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
    setTimeout(() => {
      this.search(this.state.price, this.state.bed, this.state.type, this.state.listing)
      this.getUserProperties()
    }, 1000)
  }

  setCenter = (lat, lng) => {
    var { center, loading } = this.state;
    center[0] = lat
    center[1] = lng
    loading = false;
    this.setState({ center, loading })
  }

  async getUserProperties() {
    const response = await axios.get('/properties?user_name=' + this.props.auth.user.name)
    var { userProperties } = this.state;
    userProperties = response.data
    this.setState({ userProperties })
  }

  handleCenterChanged = () => {
    const { center } = this.state;
    center[0] = this.map.current.getCenter().lat()
    center[1] = this.map.current.getCenter().lng()
    this.setState({ center })
  }

  hideDetail() {
    this.setState({ detail: false });
  }

  showDetail() {
    this.setState({ detail: true });
  }

  hideUploadForm() {
    this.setState({ upload: false });
  }

  showUploadForm() {
    this.setState({ upload: true });
  }

  hidePropertyList() {
    this.setState({ list: false });
  }

  showPropertyList() {
    this.setState({ list: true });
  }

  handleError = (error) => {
    var { loading } = this.state;
    loading = false;
    this.setState({ loading })
    setTimeout(() => {
      this.search(this.state.price, this.state.bed, this.state.type, this.state.listing)
      this.getUserProperties()
    }, 1000)
  }

  async handleDelete(user_id, id) {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await axios.delete('/properties/' + id, { data:{ user_id: user_id } }).then(function (response) {
        window.location.reload();
      }).catch(function (error) {
        alert(error);
      });
    }
  }

  async componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.setCurrentPosition, this.handleError, { timeout:10000 });
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  handleMarkerClick = (key) => {
    var { property } = this.state;
    property = this.state.properties[key]
    this.setState({ property });
    this.showDetail();
  }

  handleUserMarkerClick = (key) => {
    var { property } = this.state;
    property = this.state.userProperties[key]
    this.setState({ property });
    this.showDetail();
  }

  onChange = () => {
    this.search(this.state.price, this.state.bed, this.state.type, this.state.listing)
  }

  go = (i) => {
    const lat = this.state.userProperties[i].lat
    const lng = this.state.userProperties[i].lng
    this.hidePropertyList();
    this.setCenter(lat, lng)
    setTimeout(() => {
      this.search(this.state.price, this.state.bed, this.state.type, this.state.listing)
    }, 100)
  }

  async search (price, bed, type, listing) {
    if (this.map.current == null) {
      return
    }
    const bounds = this.map.current.getBounds()
    const nelat = bounds.na.l
    const nelng = bounds.ga.l
    const swlat = bounds.na.j
    const swlng = bounds.ga.j
    const params =  'nelat=' + nelat +
                    '&swlat=' + swlat +
                    '&nelng=' + nelng +
                    '&swlng=' + swlng +
                    '&price=' + price +
                    '&bed=' + bed +
                    '&type=' + type +
                    '&listing=' + listing
    this.setState({ 
      price: price,
      bed: bed,
      type: type,
      listing: listing
    })
    const response = await axios.get('/properties?' + params)
    var { properties } = this.state;
    properties = response.data
    this.setState({ properties })
  }

  render() {
    return (
      <div>
        <RegularBanner />
        <Filter 
          search={this.search}
          setCenter={this.setCenter}
          auth={this.props.auth}
          handleShowUploadForm={this.showUploadForm}
          handleShowPropertyList={this.showPropertyList}
        />
        <Detail 
          show={this.state.detail}
          handleClose={this.hideDetail}
          property={this.state.property}
          auth={this.props.auth}
          handleDelete={this.handleDelete}
        />
        <Upload
          show={this.state.upload}
          handleClose={this.hideUploadForm}
          auth={this.props.auth}
        />
        <List
          show={this.state.list}
          handleClose={this.hidePropertyList}
          properties={this.state.userProperties}
          go={this.go}
        />
        <Map 
          map={this.map}
          centerlat={this.state.center[0]}
          centerlng={this.state.center[1]}
          poslat={this.state.lat}
          poslng={this.state.lng}
          properties={this.state.properties}
          userProperties={this.state.userProperties}
          handleMarkerClick={this.handleMarkerClick}
          handleUserMarkerClick={this.handleUserMarkerClick}
          handleCenterChanged={this.handleCenterChanged}
          onChange={this.onChange}
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Property);

