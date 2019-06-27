import React, { Component } from 'react';
import './Service.css';
import { Card, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';

import LinesEllipsis from 'react-lines-ellipsis'
import star from '../../images/rating.png'
import email from '../../images/email.png'
import phone from '../../images/phone.png'


class Item extends Component {
  render() {
    return (
      <div>
        <Link to={'/services/' + this.props.id} style={{textDecoration: 'none'}}>
          <Card id="service-item" className="service-list-item">
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img className="service-list-img" src={'/images/property/' + this.props.logo}/>
                </Col>
                <Col>
                  <Card.Title style={{color: "black"}}>{this.props.name}</Card.Title>
                  <Card.Text style={{color: "grey"}}>
                    <LinesEllipsis
                      text={this.props.desc}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    >
                    </LinesEllipsis>
                  </Card.Text>
                  {Array.from(Array(parseInt(this.props.rating)), (e, i) => {
                    return <img key={i} src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                  })}
                  <div style={{marginTop: "1rem", color: "black"}}>
                    <img className="service-contact-icon" alt="phone" src={phone}/> {this.props.phone}
                    <img className="service-contact-icon" alt="email" src={email} style={{marginLeft: "1.5rem"}}/> {this.props.email}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Link>
      </div>
    )
  }
}


export default Item;