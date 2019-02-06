import React, { Component } from 'react'
import {Form, FormGroup, Col, ControlLabel, FormControl,  Checkbox, Button  } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class changePassword extends Component {
    constructor () {
        super();    
        this.state = {
           password: '',
           password2: '',
           errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
      
      
        const user = {
       
         password: this.state.password
       };
 
       console.log("state is " + user.password)
       var token  = this.props.match.params.token
       axios
       .post('/reset/' + token, user)
       .then(res => console.log(res))
       .catch(err => console.log(err)
       
    );
      
      return <Redirect to='/reset/' />
     }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        console.log(this.props)
        return (
           <div>
                <h1> Change Password </h1>
                <h1> {this.props.match.params.token} </h1>
                <Form horizontal onSubmit={this.onSubmit}>
                                    
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
                            placeholder="Password" 
                            value={this.state.password2} 
                            onChange={this.onChange}
                            error={errors.password2}/>
                            </Col>
                        </FormGroup>

                        

                         <Col smOffset={2} sm={10}>
                           
                          
                           <div style={{height: "10px"}}>
                           </div>
                           <Button type="submit" style={{display: "block"}}>Enter</Button>
                           </Col>
                        </Form>
          </div>
        )

    }
}

export default changePassword;