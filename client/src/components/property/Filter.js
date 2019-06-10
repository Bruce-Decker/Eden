import React, { Component } from 'react';
import './Property.css';
import { Dropdown, Form } from 'react-bootstrap';

import Geocode from "react-geocode";


const options = [
  ['For Sale', 'For Rent'],
  ['Any Price', '$1,000+', '$2,000+', '$3,000+', '$4,000+', '$5,000+'],
  ['0+ Beds', '1+ Beds', '2+ Beds', '3+ Beds', '4+ Beds', '5+ Beds', '6+ Beds'],
  ['Houses', 'Apartments', 'Townhomes']
]

Geocode.setApiKey("AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM");

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: Array.from(options, (e, i) => {return 0}),
     };
  }
  
  handleKeyPress = (target) => {
    const input = document.getElementById("property-input").value
    if(target.charCode === 13 && input !== ''){
      Geocode.fromAddress(input).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.props.setCenter(lat, lng)
        },
        error => {
          console.error(error);
        }
      );   
    } 
  }

  handleSelect = (evt) => {
    const { selected } = this.state;
    selected[evt[0]] = evt[2]
    this.setState({ selected });
  }
  
  render() {
    return (
      <div className="property-filter">
        <Form.Control id="property-input" onKeyPress={this.handleKeyPress} type="text" placeholder="Address or ZIP" />
        {Array.from(options, (e, i) => {
          return <Dropdown key={i} className="property-button" onSelect={this.handleSelect}>
                  <Dropdown.Toggle id="property-button-style">{options[i][this.state.selected[i]]}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Array.from(options[i], (e, j) => {
                      const map = [i, j]
                      return <Dropdown.Item key={j} eventKey={map}>{options[i][j]}</Dropdown.Item>
                    })}
                  </Dropdown.Menu>
                </Dropdown>
        })}
        <button className="property-search-button" onClick={this.props.search}>Search this area</button>
      </div>
    )
  }
}

export default Filter;