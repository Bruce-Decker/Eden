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
        <Link to={'/service/'} style={{textDecoration: 'none'}}>
          <Card className="service-list-category" style={{backgroundColor: "#f7f7ff", borderRadius: "5rem", border: "0"}}>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img className="service-list-img" src={this.props.img}/>
                </Col>
                <Col>
                  <Card.Title style={{color: "black"}}>Future Vision Remodeling</Card.Title>
                  <Card.Text style={{color: "grey"}}>
                    <LinesEllipsis
                      text="Future Vision Remodeling, Inc. provides quality service for your home. We pride ourselves on reliability, great communication, integrity and quality work."
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    >
                    </LinesEllipsis>
                  </Card.Text>
                  {Array.from(Array(5), (e, i) => {
                    return <img key={i} src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                  })}
                  <div style={{marginTop: "1rem", color: "black"}}>
                    <img className="service-contact-icon" alt="phone" src={phone}/> 6697581284
                    <img className="service-contact-icon" alt="email" src={email} style={{marginLeft: "1.5rem"}}/> futurevision@gmail.com
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