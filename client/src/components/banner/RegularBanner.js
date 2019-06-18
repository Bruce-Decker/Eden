import React, { Component } from 'react';
import '../../containers/App.css';
import { Dropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import search from '../../images/search.png';
import cart from '../../images/cart.png';
import apple from '../../images/apple.png';
import Home from '../home/Home';
import Product from '../product/Product';
import Service from '../service/Service';
import Property from '../property/Property';
import Food from '../food/Food';
import Cart from '../cart/Cart';
import Login from '../login/Login';
import SearchBar from './SearchBar';

import { connect } from 'react-redux';
import { logout  } from '../../redux/actions/AuthenticationActions';

class RegularBanner extends Component {

LogoutButton = (e) => {
   

  this.props.logout();
}
    render() {
      
      return (
      
        <div className="navbar-custom">
          <div className="container">
            <nav className="navbar navbar-expand-md">
              <div className="navbar-header">
                <Link to="/">
                  <img src={apple} height="32" width="32" alt="Home"></img>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
              </div>
              <div className="navbar-collapse collapse" id="navbar">
                  <ul className="navbar-nav mr-auto">
                  <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Market Items
                      </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/product">Product</Dropdown.Item>
                      <Dropdown.Item href="/service">Service</Dropdown.Item>
                      <Dropdown.Item href="/property">Property</Dropdown.Item>
                      <Dropdown.Item href="/food">Food</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <li className="nav-item">
                        <Link className="nav-link" to={`/showProfile/${this.props.auth.user.email}`} ></Link>
                </li>
                <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        My Items
                      </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href={`/showShowAllUserItems/:${this.props.auth.user.email}`}>My listed items</Dropdown.Item>
                      <Dropdown.Item href={`/createItem`}>Create items</Dropdown.Item>
                     
                    </Dropdown.Menu>
                </Dropdown>


                    
                      <li className="nav-item">
                        <Link className="nav-link" to={`/showProfile/${this.props.auth.user.email}`} >My Profile</Link>
                      </li>
                      
                     
                  </ul>
                  
                  <SearchBar/>
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                          <img src={cart} height="28" width="28" alt="Cart"></img>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                       
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/" onClick = {this.LogoutButton}>Logout</Link>
                      </li>
                  </ul>
              </div>
            </nav>
          </div>
        </div>

      )
    }

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
 


export default connect(mapStateToProps, { logout })(RegularBanner);