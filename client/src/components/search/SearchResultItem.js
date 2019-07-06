import React, { Component } from 'react';
import './SearchResults.css';
import { Card, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from 'react-router-dom';

import LinesEllipsis from 'react-lines-ellipsis';
import star from '../../images/rating.png';
import star_half from '../../images/rating_half.png';
import star_zero from '../../images/rating_zero.png';

import appliances from '../../images/appliances.png';
import arts from '../../images/arts.png';
import books from '../../images/books.png';
import clothing from '../../images/clothing.png';
import computers from '../../images/computers.png';
import electronics from '../../images/electronics.png';
import games from '../../images/games.png';
import home from '../../images/home.png';
import clothingJpg from '../../images/clothing.jpg';

class SearchResultItem extends Component {
  render() {
    return (
      <div>
        <Link to={'/items/' + this.props.id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
          <Card className="sri-item">
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img className="sri-img" src={this.props.img ? clothingJpg : getImage(this.props.category)}/>
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
                  {Array.from(Array(5), (e, i) => {
                    return <img key={i} src={this.getRatingImage(this.props.rating - i)} alt="Rating" style={{width: "18px", height: "18px", paddingBottom: "0.225rem", paddingRight: "0.225rem"}}></img>
                  })}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Link>
      </div>
    )
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

function getImage(category) {
  switch (category) {
    case "appliances":
      return appliances
    case "arts":
      return arts
    case "books":
      return books
    case "computers":
      return computers
    case "clothing":
      return clothing
    case "electronics":
      return electronics
    case "games":
      return games
    case "home":
      return home
    default:
  }
}

export default SearchResultItem;






















