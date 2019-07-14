import React, { Component } from 'react';
import './Service.css';
import { Card, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';

import LinesEllipsis from 'react-lines-ellipsis'
import star from '../../images/rating.png'
import star_half from '../../images/rating_half.png'
import star_zero from '../../images/rating_zero.png'
import email from '../../images/email.png'
import phone from '../../images/phone.png'


class Item extends Component {
  classID = "service-item"
  render() {
    return (
      <div>
        <Link to={'/services/' + this.props.id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
          <Card id={this.classID} className="service-list-item">
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img className="service-list-img" src={'/images/service/' + this.props.id + '/logo/' + this.props.logo}/>
                </Col>
                <Col>
                  <Card.Title style={{color: "black"}}>{this.props.name}</Card.Title>
                  <Card.Text style={{color: "grey", minHeight: "60px"}}>
                    <LinesEllipsis
                      text={this.props.desc}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    >
                    </LinesEllipsis>
                  </Card.Text>
                  {Array.from(Array(5), (e, i) => {
                    return <img key={i} src={this.getRatingImage(this.props.rating - i)} alt="Rating" style={{width: "18px", height: "18px", paddingBottom: "0.225rem", paddingRight: "0.225rem"}}></img>
                  })}
                  { this.props.count > 1 ? 
                    <span style={{marginLeft: "1rem", color: "#53b46e"}}>{this.props.count} reviews</span> :
                    <span style={{marginLeft: "1rem", color: "#53b46e"}}>{this.props.count} review</span> 
                  }
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

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.user_name === this.props.auth.user.name) {
        this.classID = "service-item-user"
      }
    }
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


export default Item;