import React, { Component } from 'react';
import './Checkout.css';
import {us_states} from '../../utils/utils.js';

import RegularBanner from '../banner/RegularBanner';
import Footer from '../footer/Footer';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.isBillingAddrValid = false;
    this.isShippingAddrValid = false;
    this.errorMessageElement = null;

    this.state = {
      ship_name: '',
      ship_addr1: '',
      ship_addr2: '',
      ship_city: '',
      ship_state: '',
      ship_zip: '',
      ship_country: '',
      bill_name: '',
      bill_addr1: '',
      bill_addr2: '',
      bill_city: '',
      bill_state: '',
      bill_zip: '',
      bill_country: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
    this.errorMessageElement.style.visibility = "hidden";
  }

  handleClick() {
    let url = '/payment';
    let charges = this.props.location.state;
    this.checkValid();

    if(this.isShippingAddrValid && this.isBillingAddrValid) {
      this.props.history.push({
          pathname: url,
          state: charges,
          addresses: this.state
      });
    }
    else {
      this.errorMessageElement.innerText = "Address entered is invalid. Please check and try again";
      this.errorMessageElement.style.visibility = "visible";
    }
  }

  checkValid() {
    if(this.state.bill_name !== '' &&
      this.state.bill_addr1 !== '' &&
      this.state.bill_city !== '' &&
      this.state.bill_state !== '' &&
      this.state.bill_zip !== '' &&
      this.state.bill_country !== '') {
      this.isBillingAddrValid = true;
    }
    if(this.state.ship_name !== '' &&
      this.state.ship_addr1 !== ''&&
      this.state.ship_city !== ''&&
      this.state.ship_state !== ''&&
      this.state.ship_zip !== ''&&
      this.state.ship_country !== '') {
      this.isShippingAddrValid = true;
    }
  }

  render() {
    return (
      <div>
        <RegularBanner/>
        <div class="container">
            <div id="checkout-header">
              <h1>Checkout</h1>
            </div>
            <div id="error-message" className="alert alert-danger" role="alert">
              Error
            </div>
            <div id='checkout-container' className='ck-row'>
              <div className='ck-col divider'>
                <div id='shipping'>
                  <h3>Shipping Address</h3>
                  <form className="ui form" onSubmit = {this.onSubmit}>
                    <div className="field">
                      <label>Full Name<span className='req'>*</span></label>
                      <input type="text"
                        placeholder="John Doe"
                        name="ship_name"
                        aria-label="Full Name"
                        autoComplete="off"
                        value={this.state.ship_name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="field">
                      <label>Address Line 1<span className='req'>*</span> (street, P.O. box, company name)</label>
                      <input type="text"
                        placeholder="123 Wall Street"
                        name="ship_addr1"
                        aria-label="Address Line 1"
                        autoComplete="off"
                        value={this.state.ship_addr1}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="field">
                      <label>Address Line 2<span className='req'>*</span> (apartment, suite, unit, building, floor)</label>
                      <input type="text"
                        placeholder="Apt 456"
                        name="ship_addr2"
                        aria-label="Address Line 2"
                        autoComplete="off"
                        value={this.state.ship_addr2}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="field">
                      <label>City<span className='req'>*</span></label>
                      <input type="text"
                        placeholder="San Jose"
                        name="ship_city"
                        aria-label="City"
                        autoComplete="off"
                        value={this.state.ship_city}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className='three-col-row'>
                      <div className='three-col-col'>
                        <div className="field">
                          <label>State/Province/Region<span className='req'>*</span></label>
                          <input type="text"
                            placeholder="California"
                            name="ship_state"
                            aria-label="State"
                            autoComplete="off"
                            value={this.state.ship_state}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className='center-col'>
                        <div className="field">
                          <label>Zip/Postal Code<span className='req'>*</span></label>
                          <input type="text"
                            placeholder="95192"
                            name="ship_zip"
                            aria-label="Zip"
                            autoComplete="off"
                            value={this.state.ship_zip}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className='three-col-col'>
                        <div className="field">
                          <label>Country<span className='req'>*</span></label>
                          <input type="text"
                            placeholder="United States"
                            name="ship_country"
                            aria-label="Country"
                            autoComplete="off"
                            value={this.state.ship_country}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className='ck-col'>
                <div id='billing'>
                  <h3>Billing Address</h3>
                  <form className="ui form" onSubmit = {this.onSubmit}>
                    <div className="field">
                      <label>Full Name<span className='req'>*</span></label>
                      <input type="text"
                        placeholder="John Doe"
                        name="bill_name"
                        aria-label="Full Name"
                        autoComplete="off"
                        value={this.state.bill_name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="field">
                      <label>Address Line 1<span className='req'>*</span> (street, P.O. box, company name)</label>
                      <input type="text"
                        placeholder="123 Wall Street"
                        name="bill_addr1"
                        aria-label="Address Line 1"
                        autoComplete="off"
                        value={this.state.bill_addr1}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="field">
                      <label>Address Line 2<span className='req'>*</span> (apartment, suite, unit, building, floor)</label>
                      <input type="text"
                        placeholder="Apt 456"
                        name="bill_addr2"
                        aria-label="Address Line 2"
                        autoComplete="off"
                        value={this.state.bill_addr2}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="field">
                      <label>City<span className='req'>*</span></label>
                      <input type="text"
                        placeholder="San Jose"
                        name="bill_city"
                        aria-label="City"
                        autoComplete="off"
                        value={this.state.bill_city}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className='three-col-row'>
                      <div className='three-col-col'>
                        <div className="field">
                          <label>State/Province/Region<span className='req'>*</span></label>
                          <input type="text"
                            placeholder="California"
                            name="bill_state"
                            aria-label="State"
                            autoComplete="off"
                            value={this.state.bill_state}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className='center-col'>
                        <div className="field">
                          <label>Zip/Postal Code<span className='req'>*</span></label>
                          <input type="text"
                            placeholder="95192"
                            name="bill_zip"
                            aria-label="Zip"
                            autoComplete="off"
                            value={this.state.bill_zip}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className='three-col-col'>
                        <div className="field">
                          <label>Country<span className='req'>*</span></label>
                          <input type="text"
                            placeholder="United States"
                            name="bill_country"
                            aria-label="Country"
                            autoComplete="off"
                            value={this.state.bill_country}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div id='checkout-submit'>
              <button className="checkout-button" onClick={this.handleClick}>Checkout</button>
            </div>
            <Footer/>
        </div>
      </div>
    );
  }

  componentWillMount() {
    if(!this.props.auth || !this.props.auth.user || !this.props.auth.user.email) {
      let url = '/login';

      this.props.history.push({
        pathname: url
      });
    }
  }

  componentDidMount() {
    this.errorMessageElement = document.getElementById("error-message");
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default withRouter(connect(
  mapStateToProps
)(Checkout));



















