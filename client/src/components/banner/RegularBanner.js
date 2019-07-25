import React, { Component } from 'react';
import '../../containers/App.css';
import { Dropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import user from '../../images/user.png';
import cart from '../../images/cart.png';
import apple from '../../images/apple.png';
import log from '../../images/logout.png';
import email from '../../images/email.png';
import profile from '../../images/profile.png';
import add from '../../images/add.png';
import burger from '../../images/burger.png';
import SearchBar from './SearchBar';
import './Banner.css'

import { connect } from 'react-redux';
import { logout  } from '../../redux/actions/AuthenticationActions';

class RegularBanner extends Component {

LogoutButton = (e) => {
   
  if (window.confirm('Are you sure you want to log out?')) {
    this.props.logout();
    window.location = "/"
  }
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
                    <li class="nav-item">
                      <Link class="nav-link" to="/product">Product</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/service">Service</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/property">Property</Link>
                    </li>

                     
                      
                     
                  </ul>
                  
                  <SearchBar/>
                  {!this.props.auth.isAuthenticated ?
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                          <img src={cart} height="28" width="28" alt="Cart"></img>
                        </Link>
                      </li>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-profile">
                          {this.props.image ?
                            <img src={cart} height="28" width="28" alt="Cart"></img>
                            :
                            <img src={user} height="28" width="28" alt="User" style={{marginTop: "0.11rem"}}></img>
                          }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link id="dropdown-item" to={'/showProfile/' + this.props.auth.user.email}>
                              <img src={profile} height="22" width="22" alt="Profile" style={{marginRight: "0.5rem"}}></img>
                              Profile
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link id="dropdown-item" to={'/inbox/' + this.props.auth.user.email + '/0'}>
                              <img src={email} height="16" width="22" alt="Email" style={{marginRight: "0.5rem"}}></img>
                              Inbox
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link id="dropdown-item" to={'/showShowAllUserItems/' + this.props.auth.user.email}>
                              <img src={burger} height="22" width="22" alt="Items" style={{marginRight: "0.5rem"}}></img>
                              Listed Items
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item id="dropdown-item">
                            <Link id="dropdown-item" to={'/createItem'}>
                              <img src={add} height="18" width="22" alt="Add" style={{marginRight: "0.5rem", marginBottom: "0.3rem"}}></img>
                              Create Item
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item id="dropdown-item">
                            <div onClick={this.LogoutButton}>
                              <img src={log} height="20" width="22" alt="Logout" style={{marginRight: "0.5rem"}}></img>
                              Log out
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ul>
                  }
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