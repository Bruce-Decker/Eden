import React, { Component } from 'react';
import './Property.css';
import { Dropdown, Form } from 'react-bootstrap';

import { BrowserRouter as Route, Link } from 'react-router-dom';


const options = [
  ['For Sale', 'For Rent'],
  ['Any Price', '$1,000+', '$2,000+', '$3,000+', '$4,000+', '$5,000+'],
  ['0+ Beds', '1+ Beds', '2+ Beds', '3+ Beds', '4+ Beds', '5+ Beds', '6+ Beds'],
  ['Houses', 'Apartments', 'Townhomes']
]

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: Array.from(options, (e, i) => {return 0}),
     };
  }

  handleKeyPress(target) {
    if(target.charCode == 13){
      alert('Enter clicked!!!');    
    } 
  }

  search = () => {
    console.log(this.map.current.getBounds())
  }

  handleSelect = (evt) => {
    const { selected } = this.state;
    selected[evt[0]] = evt[2]
    this.setState({ selected });
  }
  
  render() {
    return (
      <div className="property-filter">
        <Form.Control id="property-input" onKeyPress={this.handleKeyPress} placeholder="Address or ZIP" />
        {Array.from(options, (e, i) => {
          return <Dropdown className="property-button" onSelect={this.handleSelect}>
                  <Dropdown.Toggle id="property-button-style">{options[i][this.state.selected[i]]}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Array.from(options[i], (e, j) => {
                      const map = [i, j]
                      return <Dropdown.Item eventKey={map}>{options[i][j]}</Dropdown.Item>
                    })}
                  </Dropdown.Menu>
                </Dropdown>
        })}
        <button className="property-search-button" onClick={this.search}>Search this area</button>
      </div>
    )
  }
}

export default Filter;