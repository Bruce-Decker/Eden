import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux';
import { Jumbotron, Button } from 'reactstrap';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap'
import iceland from './iceland-2.jpg'
import game from './game.jpg'
import '../../App.css'
import Slider from "react-slick";

class Landing extends Component {

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        return (
           <div className="landing">
           <div className="landing_nav">
            <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                        <a href="#brand">React-Bootstrap</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                        <NavItem eventKey={1} href="#">
                            Link
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                        <NavItem eventKey={1} href="/register">
                            Sign Up
                        </NavItem>
                        <NavItem eventKey={2} href="/login">
                            Login
                        </NavItem>
                        </Nav>
                    </Navbar.Collapse>
         </Navbar>
        </div>
       
        
         <div className="carousel">
         <Slider {...settings}>
        <div>
          <h3><img className="iceland" src={iceland} /></h3>
        </div>
        <div>
          <h3><img className="iceland" src={game} /></h3>
        </div>
        
      </Slider>
        
         </div>
            
        </div>
           
        );
    }
}

export default Landing;