import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classnames from 'classnames'
import {Form, FormGroup, Col, ControlLabel, FormControl,  Checkbox, Button  } from 'react-bootstrap'
import {NavItem, NavDropdown, MenuItem, Nav, Navbar  } from 'react-bootstrap'
import { loginUser } from '../../actions/authActions'
import { Link } from 'react-router-dom'

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData)
        
       
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
  

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          //this.props.history.push('/profile');
          return <Redirect to='/profile' />
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push('/profile');
        }
    
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
  render() {
      const { errors } = this.state;
        return (
            <div className="login" >
               <h1> Login </h1>
             
               
                    <Form horizontal onSubmit={this.onSubmit}>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                            Email
                            </Col>
                            <Col sm={10}>
                            <FormControl 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={this.state.email}
                            onChange={this.onChange} 
                            error={errors.email}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                            Password
                            </Col>
                            <Col sm={10}>
                            <FormControl 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={this.state.password} 
                            onChange={this.onChange}
                            error={errors.password}/>
                            </Col>
                        </FormGroup>

                       
                            <Col smOffset={2} sm={10}>
                           
                            <Link to="EnterForgotEmail" style={{textAlign: 'left', display: "block"}} > Forget Email </Link>
                            <div style={{height: "10px"}}>
                            </div>
                            <Button type="submit" style={{display: "block"}}>Sign in</Button>
                            </Col>
                           
                       

                            
                            
                            
                        
                </Form>
            </div>
        )
 }  
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps, { loginUser })(Login);