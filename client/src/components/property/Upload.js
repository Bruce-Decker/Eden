import React, { Component } from 'react';
import './Property.css';
import { Modal, Row, Col, Form } from 'react-bootstrap';

import axios from 'axios'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import ImageUploader from 'react-images-upload';
import Geocode from "react-geocode";
import uuidv4 from 'uuid/v4';

var Map;
const default_lat = 37.3351874
const default_lng = -121.8810715
const mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.31&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: '300px' }} />,
  containerElement: <div style={{ height: '300px' }} />,
  mapElement: <div style={{ height: '300px' }} />,
}

class Upload extends Component {
  constructor(props){
    super(props)

    this.map = React.createRef()
    this.listing = React.createRef()
    this.type = React.createRef()
    this.address = React.createRef()
    this.city = React.createRef()
    this.usstate = React.createRef()
    this.zip = React.createRef()
    this.desc = React.createRef()
    this.bed = React.createRef()
    this.bath = React.createRef()
    this.space = React.createRef()
    this.price = React.createRef()
    this.email = React.createRef()
    this.phone = React.createRef()
    this.lat = default_lat
    this.lng = default_lng
    this.state = { 
      pictures: [],
      center: [default_lat, default_lng],
    };
    this.onDrop = this.onDrop.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    Map = compose(
      withProps(mapAttributes),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        ref={props.map}
        defaultZoom={16}
        center={{ lat: props.lat, lng: props.lng }}
        options={{
          gestureHandling: 'greedy',
          disableDefaultUI: true
        }}
        onCenterChanged={props.handleCenterChanged}
      >
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      </GoogleMap>
    )
  }

  onDrop(pictures) {
    this.setState({
        pictures: pictures,
    });
  }

  handleAddressChanged = (target) => {
    const input = document.getElementById("property-address").value
    if (input !== ''){
      Geocode.fromAddress(input).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setCenter(lat, lng)
        },
        error => {
          console.error(error);
        }
      );   
    } 
  }

  handleCenterChanged = () => {
    this.setCenter(this.map.current.getCenter().lat(), this.map.current.getCenter().lng())
  }

  setCenter = (lat, lng) => {
    const { center } = this.state;
    center[0] = lat
    center[1] = lng
    this.setState({ center })
    this.lat = lat
    this.lng = lng
  }

  async handleSubmit() {
    if (this.isValid()) {
      const body = this.getData()
      await axios.post('/properties', body).then(function (response) {
        window.location.reload();
      }).catch(function (error) {
        alert(error);
      });
    }
  }

  isValid = () => {
    if (
      this.listing.current.value !== '' &&
      this.type.current.value !== '' &&
      this.address.current.value !== '' &&
      this.city.current.value !== '' &&
      this.usstate.current.value !== '' &&
      this.zip.current.value !== '' &&
      this.desc.current.value !== '' &&
      this.bed.current.value !== '' &&
      this.bath.current.value !== '' &&
      this.space.current.value !== '' &&
      this.price.current.value !== '' &&
      this.email.current.value !== '' &&
      this.phone.current.value !== '' &&
      this.lat !== '' &&
      this.lng !== ''
    ) {
      this.bed.current.value = this.bed.current.value.replace(/\,/g,'');
      this.bath.current.value = this.bath.current.value.replace(/\,/g,'');
      this.space.current.value = this.space.current.value.replace(/\,/g,'');
      this.price.current.value = this.price.current.value.replace(/\,/g,'');
      if (!isNumeric(this.bed.current.value) || 
          !isNumeric(this.bath.current.value) || 
          !isNumeric(this.space.current.value) ||
          !isNumeric(this.price.current.value)) {
        alert('Please enter numeric values for all of the following fields: \n# Bedrooms, # Bathrooms, Space (sqft), and Price($)')
        return false
      } else if (!isEmailValid(this.email.current.value)) {
        alert('Please enter a valid email address.')
        return false
      } else if (!isPhoneNumberValid(this.phone.current.value)) {
        alert('Please enter a valid phone number.')
        return false
      }
      return true
    } else {
      alert('Please enter details for all fields.')
      return false
    }
  }

  getData = () => {
    var data = new FormData()
    data.append('id', uuidv4())
    data.append('listing_type', this.listing.current.value)
    data.append('home_type', this.type.current.value)
    data.append('address', this.address.current.value)
    data.append('city', this.city.current.value)
    data.append('state', this.usstate.current.value)
    data.append('zip', this.zip.current.value)
    data.append('desc', this.desc.current.value)
    data.append('num_bed', this.bed.current.value)
    data.append('num_bath', this.bath.current.value)
    data.append('space', this.space.current.value)
    data.append('price', this.price.current.value)
    data.append('email', this.email.current.value)
    data.append('phone', this.phone.current.value)
    data.append('lat', this.lat)
    data.append('lng', this.lng)
    data.append('user_id', this.props.auth.user.id)
    data.append('user_name', this.props.auth.user.name)
    for(var i = 0; i < this.state.pictures.length; i++) {
      data.append('files', this.state.pictures[i])
      data.append('images', this.state.pictures[i].name) 
    }
    return data
  }

  render() {
    return (
    <div>
      <Modal show={this.props.show} onExited={() => window.scrollTo(0, 0)} scrollable>
        <div style={{backgroundColor: "#53b46e", color: "white"}}>
          <Modal.Header>
            <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
              Please fill in your property details.
            </Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body style={{paddingTop: "0"}}>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Listing type</Form.Label>
                <Form.Control as="select" ref={this.listing}>
                  <option value="sale">For sale</option>
                  <option value="rent">For rent</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Home type</Form.Label>
                <Form.Control as="select" ref={this.type}>
                  <option value="houses">Houses</option>
                  <option value="apartments">Apartments</option>
                  <option value="townhomes">Townhomes</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control ref={this.address}/>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control ref={this.city}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" ref={this.usstate}>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control ref={this.zip}/>
              </Form.Group>
            </Form.Row>

            <input type="text" id="property-address"  placeholder="Search Google Maps" onChange={this.handleAddressChanged}></input>
            <div style={{marginTop: "0.5rem", marginBottom: "1rem"}}>
              <Map
                map={this.map}
                lat={this.state.center[0]}
                lng={this.state.center[1]}
                handleCenterChanged={this.handleCenterChanged}
              >
              </Map>
              <Form.Text className="text-muted">
                Drag the map to pinpoint the exact location.
              </Form.Text>
            </div>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="5" ref={this.desc}/>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label># Bedrooms</Form.Label>
                <Form.Control ref={this.bed}/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label># Bathrooms</Form.Label>
                <Form.Control ref={this.bath}/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Space (sqft)</Form.Label>
                <Form.Control ref={this.space}/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Price ($)</Form.Label>
                <Form.Control ref={this.price}/>
              </Form.Group>
            </Form.Row>

            <ImageUploader
              withPreview={true}
              withIcon={true}
              withLabel={false}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png', '.jpeg']}
              maxFileSize={10485760}
              name="files"
            >
            </ImageUploader>

            <Form.Row>
              <Form.Group as={Col} controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" ref={this.email}/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Phone number</Form.Label>
                <Form.Control ref={this.phone}/>
              </Form.Group>
            </Form.Row>

          </Form>
        </Modal.Body>
        <Modal.Footer style={{display: "inline"}}>
          <Row style={{height: "40px"}}>
            <Col style={{display: "grid"}}>
              <button className="property-upload-button" onClick={this.handleSubmit}>
                Post
              </button>
            </Col>
            <Col style={{display: "grid"}}>
              <button className="property-close-button" onClick={this.props.handleClose}>
                Close
              </button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }  

}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isEmailValid(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isPhoneNumberValid(number) {
  return number.match(/\d/g).length===10;
}

export default Upload