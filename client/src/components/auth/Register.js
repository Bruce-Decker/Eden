import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import classnames from 'classnames'
import { registerUser } from '../../actions/authActions';
import {Form, FormGroup, Col, ControlLabel, FormControl,  Checkbox, Button  } from 'react-bootstrap'
import {NavItem, NavDropdown, MenuItem, Nav, Navbar  } from 'react-bootstrap'
class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/login');
        }
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
          };
      
          this.props.registerUser(newUser, this.props.history);
          
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
  render() {
    const { errors } = this.state;
        return (
            <div className="login">
               <h1> Register </h1>
               <Form horizontal onSubmit={this.onSubmit}>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                            Email
                            </Col>
                            <Col sm={10}>
                            <FormControl 
                            type="email" 
                            name="email"
                            placeholder="email" 
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}  />
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

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                            Type Password Again
                            </Col>
                            <Col sm={10}>
                            <FormControl 
                            type="password" 
                            name="password2"
                            placeholder="Password2" 
                            value={this.state.password2} 
                            onChange={this.onChange}
                            error={errors.password2}/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                            <Checkbox>Remember me</Checkbox>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                            <Button type="submit">Sign in</Button>
                            </Col>
                        </FormGroup>
                       
                </Form>
            </div>
        )
 }  
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
