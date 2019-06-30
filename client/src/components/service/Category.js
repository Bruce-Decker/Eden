import React, { Component } from 'react';
import './Service.css';
import { Card, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';


class Category extends Component {
  render() {
    return (
      <div>
        <Link to={'/service/' + this.props.service.toLowerCase()} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
          <Card className="service-card-category" style={{backgroundColor: this.props.bg, borderRadius: "25rem", border: "0", animation: "0.8s fadein"}}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Img className="service-card-img" src={this.props.img}/>
                </Col>
                <Col>
                  <Card.Title style={{fontWeight: "bold", color: "black"}}>{this.props.service}</Card.Title>
                  <Card.Text style={{color: "black"}}>
                    {this.props.desc}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Link>
      </div>
    )
  }
}


export default Category;