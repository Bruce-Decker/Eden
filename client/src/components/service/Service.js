import React, { Component } from 'react';
import RegularBanner from '../banner/RegularBanner';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import './Service.css';

import axios from 'axios'
import { connect } from 'react-redux'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { ObjectID } from 'bson';
import Geocode from "react-geocode";
import ImageUploader from 'react-images-upload';

import Category from './Category';
import Footer from '../footer/Footer';
import hammer from '../../images/hammer.png';
import shovel from '../../images/shovel.png';
import plug from '../../images/plug.png';
import key from '../../images/key.png';
import broom from '../../images/broom.png';
import mover from '../../images/mover.png';
import ac from '../../images/ac.png';
import tap from '../../images/tap.png';
import add from '../../images/add.png';
import burger from '../../images/burger.png';
import star from '../../images/rating.png'
import star_half from '../../images/rating_half.png'
import star_zero from '../../images/rating_zero.png'

const categories = {
    images: [hammer, shovel, plug, key, broom, mover, ac, tap],
    services: ['Contractors', 'Landscaping', 'Electricians', 'Locksmiths', 'Cleaners', 'Movers', 'HVAC', 'Plumbers'],
    descriptions: ['Find the best contractors who can finish construction projects swiftly and with high quality.',
                   'Find the best landscapers who can transform your area to restore beauty and utility.',
                   'Find the best electricians who can ensure that power is available and dependable in all areas.',
                   'Find the best locksmiths who can secure your home, personal belongings, and peace of mind.',
                   'Find the best cleaners who can restore spaces to pristine condition, perfect for entertaining.',
                   'Find the best movers who can transport all your belongings in record time and condition.',
                   'Find the best HVAC technicians who can improve the temperature conditions in your workspace.',
                   'Find the best plumbers who can loosen the flow within critical pipes in your network.']
}
var List;
var Add;
var Map;
const default_lat = 37.3351874
const default_lng = -121.8810715
const mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.31&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: '300px' }} />,
  containerElement: <div style={{ height: '300px' }} />,
  mapElement: <div style={{ height: '300px' }} />,
}
class Service extends Component {
  constructor(props){
    super(props)

    this.map = React.createRef()
    this.name = React.createRef()
    this.type = React.createRef()
    this.address = React.createRef()
    this.city = React.createRef()
    this.usstate = React.createRef()
    this.zip = React.createRef()
    this.desc = React.createRef()
    this.email = React.createRef()
    this.phone = React.createRef()

    this.state = {
      list: false,
      add: false,
      services: [],
      offeredServices: [],
      logo: null,
      images: [],
      lat: default_lat,
      lng: default_lng,
      id: null,
      name: '',
      type: 'Contractors',
      desc: '',
      address: '',
      city: '',
      state: 'Alabama',
      zip: '',
      email: '',
      phone: '',
      isEdit: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)

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

    List = props => 
      <Modal show={props.show} onExited={() => window.scrollTo(0, 0)} scrollable>
        <div style={{backgroundColor: "#53b46e", color: "white"}}>
          <Modal.Header>
            <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
              Your services
            </Modal.Title>
          </Modal.Header>
        </div>
        {props.services.length > 0 ? 
        (
          <Modal.Body style={{paddingTop: "0", paddingBottom: "0", maxWidth: "100%", overflowX: "hidden"}}>
            {Array.from(props.services, (e, i) => {
              const service = props.services[i]
              return  <Link to={'/services/' + service._id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
                        <Row className="service-list" style={{borderBottom: "1px solid #dee2e6", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                          <Col xs={1} style={{paddingTop: "0.7rem"}}>
                            <img src={getImage(service.category)} alt="category" style={{width: "28px", height: "28px"}}></img>
                          </Col>
                          <Col>
                            <div style={{fontWeight: "600", fontSize: "1rem", color: "black", paddingTop: "0.2rem", }}>
                              {service.name}
                              <div>
                                {Array.from(Array(5), (e, i) => {
                                  return <img key={i} src={this.getRatingImage(service.rating - i)} alt="Rating" style={{width: "18px", height: "18px", paddingBottom: "0.225rem", paddingRight: "0.225rem"}}></img>
                                })}
                              </div>
                            </div>
                          </Col>
                          <Col xs={2}>
                            <div>
                              <Link to={'/service/'} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
                                <button className="service-button" style={{marginTop: "0.7rem", width: "100%"}} onClick={() => props.handleEdit(service._id)}>
                                  Edit
                                </button>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </Link>
            })}
          </Modal.Body>
        ) :
        (
          <Modal.Body style={{borderBottom: "1px solid #dee2e6", maxWidth: "100%", overflowX: "hidden"}}>
            <div style={{fontWeight: "600", textAlign: "center", marginTop: "8rem", marginBottom: "8rem"}}>
              You have no listed services.
            </div>
          </Modal.Body>
        )}
        <Modal.Footer style={{display: "inline", borderTop: "none"}}>
          <Row style={{height: "40px"}}>
            <Col style={{display: "grid"}}>
            </Col>
            <Col style={{display: "grid"}}>
              <button className="service-button" onClick={props.handleClose}>
                Close
              </button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      Add = props => 
        <Modal show={props.show} onExited={() => window.scrollTo(0, 0)} scrollable>
          <div style={{backgroundColor: "#53b46e", color: "white"}}>
            <Modal.Header>
              <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
                Please fill in your service details.
              </Modal.Title>
            </Modal.Header>
          </div>
          <Modal.Body style={{paddingTop: "0"}}>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control ref={this.name} value={this.state.name} onChange={(e) => {this.setState({ name: e.target.value })}}/>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Service type</Form.Label>
                  <Form.Control as="select" ref={this.type} value={this.state.type} onChange={(e) => {this.setState({ type: e.target.value })}}>
                    <option value="contractors">Contractors</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="electricians">Electricians</option>
                    <option value="locksmiths">Locksmiths</option>
                    <option value="cleaners">Cleaners</option>
                    <option value="movers">Movers</option>
                    <option value="hvac">HVAC</option>
                    <option value="plumbers">Plumbers</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="7" ref={this.desc} value={this.state.desc} onChange={(e) => {this.setState({ desc: e.target.value })}}/>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Services offered</Form.Label>
                  </Col>
                  <Col>
                    <div style={{float: "right"}}>
                      <input type="text" id="service-offered" placeholder="Add offered service"></input>
                      <img src={add} alt="add" style={{width: "14px", height: "14px", marginRight: "0.25rem", cursor: "pointer"}}
                           onClick={props.handleAddService}
                      ></img>
                    </div>
                  </Col>
                </Row>
                <div>
                  {props.offeredServices.length > 0 ?
                    Array.from(Array(Math.floor((props.offeredServices.length + 1) / 2)), (_, i) => {
                      return  <Row style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
                                {Array.from(Array(2), (_, j) => {
                                  const index = (i * 2) + j
                                  if (index === props.offeredServices.length) {
                                    return <Col style={{marginRight: "0.5rem", marginTop: "0.5rem"}}></Col>
                                  }
                                  return  <Col className="service-offered" style={{marginRight: "0.5rem", marginTop: "0.5rem"}}>
                                            {props.offeredServices[index]}
                                            <img src={add} alt="add" style={{float: "right", width: "10px", height: "10px", cursor: "pointer", transform: "rotate(45deg)", marginTop: "0.4rem"}}
                                                onClick={() => props.handleRemoveService(index)}
                                            ></img>
                                          </Col>
                                })}
                              </Row>
                  }):
                    <Row style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
                      <Col className="service-offered" style={{marginRight: "0.5rem", marginTop: "0.5rem", color: "grey"}}>e.g. A/C Installation</Col>
                      <Col style={{marginRight: "0.5rem", marginTop: "0.5rem"}}></Col>
                    </Row>
                  }
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control ref={this.address} value={this.state.address} onChange={(e) => {this.setState({ address: e.target.value })}}/>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control ref={this.city} value={this.state.city} onChange={(e) => {this.setState({ city: e.target.value })}}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" ref={this.usstate} value={this.state.state} onChange={(e) => {this.setState({ state: e.target.value })}}>
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
                  <Form.Control ref={this.zip} value={this.state.zip} onChange={(e) => {this.setState({ zip: e.target.value })}}/>
                </Form.Group>
              </Form.Row>

              <input type="text" id="service-address" placeholder="Search Google Maps" onChange={this.handleAddressChanged}></input>
              <div style={{marginTop: "0.5rem", marginBottom: "1rem"}}>
                <Map
                  map={this.map}
                  handleCenterChanged={this.handleCenterChanged}
                  lat={this.state.lat}
                  lng={this.state.lng}
                >
                </Map>
                <Form.Text className="text-muted">
                  Drag the map to pinpoint the exact location.
                </Form.Text>
              </div>

              <ImageUploader
                withPreview={true}
                withIcon={true}
                withLabel={false}
                buttonText='Choose your logo image'
                onChange={this.onDropLogo}
                imgExtension={['.jpg', '.png', '.jpeg']}
                maxFileSize={10485760}
                name="file"
                singleImage="true"
              >
              </ImageUploader>

              <ImageUploader
                withPreview={true}
                withIcon={true}
                withLabel={false}
                buttonText='Choose advertisement images'
                onChange={this.onDropImages}
                imgExtension={['.jpg', '.png', '.jpeg']}
                maxFileSize={10485760}
                name="files"
              >
              </ImageUploader>

              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" ref={this.email} value={this.state.email} onChange={(e) => {this.setState({ email: e.target.value })}}/>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control ref={this.phone} value={this.state.phone} onChange={(e) => {this.setState({ phone: e.target.value })}}/>
                </Form.Group>
              </Form.Row>

            </Form>
          </Modal.Body>
          <Modal.Footer style={{display: "inline"}}>
            <Row style={{height: "40px"}}>
              { this.state.isEdit && 
                <Col style={{display: "grid"}}>
                  <button className="service-delete-button" onClick={() => this.handleDelete(this.state.id)}>
                    Delete
                  </button>
                </Col>
              }
              <Col style={{display: "grid"}}>
                <button className="service-button" onClick={this.handleSubmit}>
                  Post
                </button>
              </Col>
              <Col style={{display: "grid"}}>
                <button className="service-button" onClick={props.handleClose}>
                  Close
                </button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
  }

  render() {
    return (
      <div>
        <RegularBanner />
        <div style={{width: "1000px", marginLeft: "auto", marginRight: "auto"}}>
          <div style={{marginTop: "1.5rem", marginBottom: "1.5rem", display: "flex"}}>
            <span style={{marginRight: "auto", width: "60px"}}></span>
            <span className="service-title">Services</span>
            <span style={{marginLeft: "auto", width: "60px", paddingTop: "7px"}}>
              <img src={add} alt="add" style={{width: "22px", height: "22px", marginRight: "0.75rem", cursor: "pointer"}} onClick={() => this.isAuthenticated(0)}></img>
              <img src={burger} alt="burger" style={{width: "26px", height: "26px", cursor: "pointer"}} onClick={() => this.isAuthenticated(1)}></img>
            </span>
          </div>
          {Array.from(Array(4), (_, i) => {
            return  <Row>
                      {Array.from(Array(2), (_, j) => {
                        const index = (i * 2) + j
                        return  <Col style={{paddingBottom: "30px"}}>
                                  <Category img={categories.images[index]} 
                                            service={categories.services[index]} 
                                            desc={categories.descriptions[index]}
                                            bg='#f7f7ff'/>
                                </Col>
                      })}
                    </Row>
          })}
        </div>
        <List 
          show={this.state.list}
          services={this.state.services}
          handleClose={() => this.setState({list: false})}
          handleEdit={this.handleEdit}
        />
        <Add
          show={this.state.add}
          map={this.map}
          handleClose={() => {
            this.setDefault()
            this.setState({add: false, isEdit: false}
          )}}
          handleAddService={this.handleAddService}
          handleRemoveService={this.handleRemoveService}
          offeredServices={this.state.offeredServices}
        />
        <Footer />
      </div>
    );
  }

  componentWillMount() {
    this.getServices()
  }

  async getServices() {
    const response = await axios.get('/services?user_name=' + this.props.auth.user.name)
    var { services } = this.state;
    services = response.data
    this.setState({ services })
  }

  async handleSubmit() {
    if (this.isValid()) {
      const body = this.getData()
      if (!this.state.isEdit) {
        await axios.post('/services', body).then(function (response) {
          window.location = "/services/" + body.get("_id").toString()
        }).catch(function (error) {
          alert(error);
        });
      } else {
        await axios.put('/services/' + this.state.id, body).then(function (response) {
          window.location = "/services/" + body.get("_id").toString()
        }).catch(function (error) {
          alert(error);
        });
      }
    }
  }

  async handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await axios.delete('/services/' + id, { data:{ user_id: this.props.auth.user.id } }).then(function (response) {
        window.location.reload();
      }).catch(function (error) {
        alert(error);
      });
    } 
  }

  async handleEdit(_id) {
    const response = await axios.get('/services/' + _id)
    var { id, name, type, desc, address, city, state, zip, lat, lng, email, phone, offeredServices } = this.state;
    id = response.data._id
    name = response.data.name
    type = response.data.category
    desc = response.data.desc
    address = response.data.address
    city = response.data.city
    state = response.data.state
    zip = response.data.zip
    lat = response.data.lat
    lng = response.data.lng
    email = response.data.email
    phone = response.data.phone
    offeredServices = response.data.services
    this.setState({ id, name, type, desc, address, city, state, zip, lat, lng, email, phone, offeredServices })
    this.setState({ add: true, isEdit: true})
  }

  handleAddService = (id) => {
    const input = document.getElementById("service-offered").value
    if (input !== '') {
      var { offeredServices } = this.state
      offeredServices.push(input)
      this.setState({ offeredServices })
    }
  }

  handleRemoveService = (index) => {
    var { offeredServices } = this.state
    offeredServices.splice(index, 1)
    this.setState({ offeredServices })
  }

  handleCenterChanged = () => {
    this.setState({ lat: this.map.current.getCenter().lat(), lng: this.map.current.getCenter().lng()})
  }

  handleAddressChanged = (target) => {
    const input = document.getElementById("service-address").value
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

  onDropLogo = (picture) => {
    this.setState({
        logo: picture,
    });
  }

  onDropImages = (pictures) => {
    this.setState({
        images: pictures,
    });
  }

  setDefault = () => {
    this.setState({
      offeredServices: [],
      lat: default_lat,
      lng: default_lng,
      id: null,
      name: '',
      type: 'Contractors',
      desc: '',
      address: '',
      city: '',
      state: 'Alabama',
      zip: '',
      email: '',
      phone: ''
    })
  }

  isAuthenticated = (type) => {
    if (!this.props.auth.isAuthenticated) {
      window.alert("Please log in and try again.")
    } else {
      if (!type) this.setState({ add: true })
      else this.setState({ list: true })
    }
  }

  isValid = () => {
    if (
      this.name.current.value !== '' &&
      this.type.current.value !== '' &&
      this.address.current.value !== '' &&
      this.city.current.value !== '' &&
      this.usstate.current.value !== '' &&
      this.zip.current.value !== '' &&
      this.desc.current.value !== '' &&
      this.email.current.value !== '' &&
      this.phone.current.value !== '' &&
      this.state.offeredServices.length > 0
    ) {
      if (this.state.logo === null) {
        alert('Please select your logo image.')
        return false
      } else if (this.state.images.length === 0) {
        alert('Please add one or more advertisement images.')
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
    data.append('_id', this.state.id ? this.state.id : new ObjectID())
    data.append('name', this.name.current.value)
    data.append('type', this.type.current.value)
    data.append('address', this.address.current.value)
    data.append('city', this.city.current.value)
    data.append('state', this.usstate.current.value)
    data.append('zip', this.zip.current.value)
    data.append('desc', this.desc.current.value)
    data.append('email', this.email.current.value)
    data.append('phone', this.phone.current.value)
    data.append('lat', this.state.lat)
    data.append('lng', this.state.lng)
    data.append('user_id', this.props.auth.user.id)
    data.append('user_name', this.props.auth.user.name)
    for(var i = 0; i < this.state.offeredServices.length; i++) {
      data.append('services', this.state.offeredServices[i])
    }
    if (this.state.logo != null) {
      data.append('logo', this.state.logo[0].name)
      data.append('file', this.state.logo[0])
    }
    for(var i = 0; i < this.state.images.length; i++) {
      data.append('files', this.state.images[i])
      data.append('images', this.state.images[i].name) 
    }
    return data
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

function isEmailValid(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isPhoneNumberValid(number) {
  return number.match(/\d/g).length===10;
}

export default connect(mapStateToProps)(Service);