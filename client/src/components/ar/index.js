import React, { Component } from 'react';
import { render } from 'react-dom'
import './Ar.css';

import axios from 'axios'
import AFrame from './AFrame'


class Ar extends Component {
  constructor(props){
    super(props)
    this.state = {
      ar: null
    };
  }

  render() {
    return (
      <div>
        <AFrame ar={this.state.ar}/>
      </div>
    );
  }  

  async componentWillMount() {
    if (this.props.location.state == null) {
      const response = await axios.get('/items/' + this.props.match.params.id)
      this.setState({ ar: response.data.ar })
    }
  }

  componentWillUnmount() {
    window.location.reload();
  }

}
 

export default Ar;