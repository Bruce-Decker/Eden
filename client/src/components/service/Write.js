import React, { Component } from 'react';
import './Service.css';
import { Modal, Row, Col, Form } from 'react-bootstrap';

import Star from './Star'
import axios from 'axios'

class Write extends Component {
  constructor(props) {
    super(props)
    this.text = React.createRef()
    this.state = {
      rating: 0
    }
  }
  
  render() {
    return (
      <div>
        <Modal show={this.props.show} scrollable>
          <div style={{backgroundColor: "#53b46e", color: "white"}}>
            <Modal.Header>
              <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
                Write a review for {this.props.name}
              </Modal.Title>
            </Modal.Header>
          </div>
          <Modal.Body style={{borderBottom: "1px solid #dee2e6", maxWidth: "100%", overflowX: "hidden"}}>
            <div style={{fontWeight: "600"}}>
              <Form>
                <Form.Group>
                  <Form.Control style={{outline: "none",  boxShadow: "none"}} className="service-write-textarea" as="textarea" placeholder="Your review helps others learn about great local businesses." rows="15" ref={this.text}/>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Body style={{borderBottom: "1px solid #dee2e6", maxWidth: "100%", overflowX: "hidden"}}>
            <div style={{color: "#6b757d"}}>
              Your rating: <span style={{marginLeft: "0.8rem"}}><Star rating={this.state.rating} onRating={this.onRating}/></span>
            </div>
          </Modal.Body>
          <Modal.Footer style={{display: "inline", borderTop: "none"}}>
            <Row style={{height: "40px"}}>
              <Col style={{display: "grid"}}>
                <button className="property-close-button" onClick={this.handleWrite}>
                  Post
                </button>
              </Col>
              <Col style={{display: "grid"}}>
                <button className="property-close-button" onClick={this.props.handleClose}>
                  Close
                </button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  handleWrite = () => {
    if (this.text.current.value === '') {
      alert('Please write a review for this service.')
    } else if (!this.state.rating) {
      alert('Please rate this service.')
    } else {
      axios.post('/services/' + this.props.id + '/review/', {
        user_id: this.props.auth.user.id,
        user_name: this.props.auth.user.name,
        rating: this.state.rating,
        review: this.text.current.value
      }).then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
        window.alert('An error occurred, please try again later.')
      });
    }
  }

  onRating = (rating) => {
    this.setState({ rating: rating })
  }
}

export default Write;