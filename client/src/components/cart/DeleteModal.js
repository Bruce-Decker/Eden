import React, { Component } from 'react';
import './Cart.css';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeFromCart } from '../../redux/actions/CartActions';

class DeleteModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleRemove(e) {
    let email = this.props.auth.user.email;
    let iid = this.props.iid;

    this.props.removeFromCart(email, iid);
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <button className="delete-button" name={this.props.iid} onClick={this.handleShow}>Delete</button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item from your cart?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleRemove}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
    removeFromCart: (email, iid) => {
      dispatch(removeFromCart(email, iid));
    }
  });
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteModal);





















