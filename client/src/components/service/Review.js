import React, { Component } from 'react';
import './Service.css';
import { Card, Row, Col } from 'react-bootstrap';

import star from '../../images/rating.png'
import star_zero from '../../images/rating_zero.png'
import smiley from '../../images/smiley.png'
import dislike from '../../images/dislike.png'
import smiley_clicked from '../../images/smiley_clicked.png'
import dislike_clicked from '../../images/dislike_clicked.png'


class Review extends Component {
  render() {
    const date = new Date(this.props.comment.date).toLocaleDateString("en-US")
    return (
      <div>
        <Card id="service-item" className="service-list-item" style={{borderRadius: "1rem", backgroundColor: "#f7f7ff"}}>
          <Card.Body>
            <Row>
              <Col md={4}>
                <div style={{fontWeight: "bold", fontSize: "1rem"}}>{this.props.comment.user_name}</div>
                <div>
                  {Array.from(Array(5), (e, i) => {
                    return <img key={i} src={this.getRatingImage(this.props.comment.rating - i)} alt="Rating" style={{width: "18px", height: "18px", paddingBottom: "0.225rem", paddingRight: "0.225rem"}}></img>
                  })}
                </div>
                <div style={{color: "grey", fontSize: "0.9rem"}}>{date}</div>
                <Row style={{marginTop: "1rem"}}>
                  <Col style={{textAlign: "center"}}>
                    <div className="service-rating-vote">{Object.keys(this.props.comment.upvote).length}</div>
                    <button className="service-rating-button" onClick={() => this.props.handleLike(this.props.comment._id, this.props.id)}>
                      <img src={this.getVotingImage(1)} alt="Rating" className="service-rating-img"></img>
                    </button>
                  </Col>
                  <Col style={{textAlign: "center"}}>
                  <div className="service-rating-vote">{Object.keys(this.props.comment.downvote).length}</div>
                    <button className="service-rating-button" onClick={() => this.props.handleDislike(this.props.comment._id, this.props.id)}>
                      <img src={this.getVotingImage(0)} alt="Rating" className="service-rating-img"></img>
                    </button>
                  </Col>
                </Row>
              </Col>
              <Col>
                <div>{this.props.comment.comment}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    )
  }

  getRatingImage = (rating) => {
    if (rating <= 0) {
      return star_zero
    }
    return star
  }

  getVotingImage = (type) => {
    if (type) {
      if (this.props.comment.upvote.indexOf(this.props.user_name) !== -1) {
        return smiley_clicked
      }
      return smiley
    }
    if (this.props.comment.downvote.indexOf(this.props.user_name) !== -1) {
      return dislike_clicked
    }
    return dislike
  }
}


export default Review;