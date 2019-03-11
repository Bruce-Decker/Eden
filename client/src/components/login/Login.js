import React, { Component } from 'react';
import './Login.css';
import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';
import AuthBanner from '../banner/AuthBanner'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/AuthenticationActions'

class Login extends Component {
  constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        errors: {}
    }
 }

 componentWillReceiveProps(nextProps) {
  if (nextProps.auth.isAuthenticated) {
     
       this.props.history.push('/product')
  }
  if (nextProps.errors) {
    
      this.setState({errors: nextProps.errors})
  }
}

onChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
}


onSubmit = (e) => {
  e.preventDefault()
  const user = {
     
      email: this.state.email,
      password: this.state.password,
     
  }
  //console.log(user)
  this.props.loginUser(user)

}
    render() {
      const { errors } = this.state
      return (
        <div>
            <AuthBanner />
            <div className = "loginContainer">
          
          <form onSubmit = {this.onSubmit} className="ui large form">
                              <div className="field">
                              <label> Email </label>
                              <input  type="text" 
                                      placeholder="Email" 
                                      name="email" 
                                      aria-label="Email" 
                                      autoComplete="off"
                                      value = {this.state.email}
                                      onChange = {this.onChange}
                                                               
                              />

                              <div className = "inputError">
                                      {errors.email }
                              </div>  



                              </div>
                              <div className="field">
                              <label> Password </label>
                              <input type="password" 
                                     placeholder="Password" 
                                     name="password" 
                                     aria-label="Password" 
                                     autoComplete="off" 
                                     value = {this.state.password}
                                     onChange = {this.onChange}
                              /> 

                              <div className = "inputError">
                                      {errors.password }
                              </div> 





                              </div>
                            
                              <div className="field">
                              
                              </div>
                              <button className="ui button" type="submit">Submit</button>
                              <div className="space">
                              
                              </div>
            </form>
        </div>
            
        </div>
      );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);