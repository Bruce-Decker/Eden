import React, { Component } from 'react'
import {Form, FormGroup, Col, ControlLabel, FormControl,  Checkbox, Button  } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class EnterForgotEmail extends Component {
    constructor () {
        super();
        this.state = {
            email: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
      
      
       const user = {
        email: this.state.email
      };

      console.log("state is " + user.email)

      axios
        .post('/forgot', user)
        .then(res => console.log(res))
        .catch(err => console.log(err)
        
     );
     return <Redirect to='/EnterForgotEmail/' />
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

   

    render() {
        const { errors } = this.state;
        return (
           
            <div className="EnterForgotEmail">
            <h1> Enter  Email </h1>
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

export default EnterForgotEmail;