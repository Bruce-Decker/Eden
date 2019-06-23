import React, { Component } from 'react';
import './Service.css';
import { Card, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';


class List extends Component {
  render() {
    return (
      <div>
        {this.props.match.params.category}
      </div>
    )
  }
}


export default List;