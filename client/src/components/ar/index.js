import React, { Component } from 'react';
import { render } from 'react-dom'
import './Ar.css';

import AFrame from './AFrame'


class Ar extends Component {

  render() {
    const {ar} = this.props.location.state
    return (
      <div>
        <AFrame ar={ar}/>
      </div>
    );
  }  
 }

export default Ar;