import React, { Component } from 'react';
import './Property.css';
import { Modal, Row, Col } from 'react-bootstrap';


class List extends Component {
  
  render() {
    return (
      <div>
        <Modal show={this.props.show} onExited={() => window.scrollTo(0, 0)} scrollable>
          <div style={{backgroundColor: "#53b46e", color: "white"}}>
            <Modal.Header>
              <Modal.Title style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
                Your properties
              </Modal.Title>
            </Modal.Header>
          </div>
          {this.props.properties.length > 0 ? 
          (
            Array.from(this.props.properties, (e, i) => {
              const property = this.props.properties[i]
              const address = property.address
              const state = property.state
              const zip = property.zip
              const price = format(property.price)
              return <Modal.Body key={i} style={{borderBottom: "1px solid #dee2e6", maxWidth: "100%", overflowX: "hidden"}}>
                      <Row>
                        <Col xs={9}>
                          <div style={{fontWeight: "600"}}>
                            <div>{address}, {state}, {zip}</div>
                            <div>${price}</div>
                          </div>
                        </Col>
                        <Col style={{display: "grid"}}>
                          <button className="property-go-button" onClick={() => this.props.go(i)}>Go</button>
                        </Col>
                      </Row>
                    </Modal.Body>
            })
          ) :
          (
            <Modal.Body style={{borderBottom: "1px solid #dee2e6", maxWidth: "100%", overflowX: "hidden"}}>
              <div style={{fontWeight: "600", textAlign: "center", marginTop: "8rem", marginBottom: "8rem"}}>
                You have no listed properties.
              </div>
            </Modal.Body>
          )}
          <Modal.Footer style={{display: "inline", borderTop: "none"}}>
            <Row style={{height: "40px"}}>
              <Col style={{display: "grid"}}>
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
}

function format(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default List;