import React, { Component } from 'react';
import './Property.css';
import { Dropdown, Form } from 'react-bootstrap';

import Geocode from "react-geocode";


const options = [
  ['For Sale', 'For Rent'],
  ['Any Price', '$500+', '$750+', '$1,000+', '$1,250+', '$1,500+', '$1,750+', '$2,000+', '$2,250+', '$2,500+', '$2,750+', '$3,000+'
  ,'Any Price', '$50,000+', '$75,000+', '$100,000+', '$125,000+', '$150,000+', '$175,000+', '$200,000+', '$250,000+', '$300,000+', '$400,000+', '$500,000+'],
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
    if (target.charCode === 13 && input !== ''){
      Geocode.fromAddress(input).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.props.setCenter(lat, lng)
          this.search()
        },
        error => {
          console.error(error);
        }
      );   
    } 
  }

  handleSelect = (evt) => {
    evt = JSON.parse("[" + evt + "]");
    const { selected } = this.state;
    if (evt[0] === 0 && parseInt(evt[1]) !== selected[evt[0]]) {
      selected[1] = 0
    }
    selected[evt[0]] = parseInt(evt[1])
    this.setState({ selected });
    this.search()
  }

  search = () => {
    const listing = options[0][this.state.selected[0]].split(' ')[1].toLowerCase()
    const type = options[3][this.state.selected[3]].toLowerCase()
    const bed = this.state.selected[2]
    const price = this.state.selected[1] === 0 || this.state.selected[1] === 12 ? 0:options[1][this.state.selected[1]].replace(/[|&;$%@"<>()+,]/g, "")
    this.props.search(price, bed, type, listing)
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
                      if (i === 1 && j >= options[i].length / 2) return null
                      if (i === 1 && this.state.selected[0] === 0) j += options[i].length / 2
                      const map = [i, j]
                      return <Dropdown.Item key={j} eventKey={map}>{options[i][j]}</Dropdown.Item>
                    })}
                  </Dropdown.Menu>
                </Dropdown>
        })}
        {this.props.auth.isAuthenticated && 
          <span>
            <button className="property-filter-button" onClick={this.props.handleShowPropertyList}>Your properties</button>
            <button className="property-filter-button" onClick={this.props.handleShowUploadForm}>List your property</button>
          </span>
        }
      </div>
    )
  }
}

export default Filter;