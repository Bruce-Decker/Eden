import React, { Component } from 'react';
import './Register.css';
import RegularBanner from '../banner/RegularBanner'
import { registerUser } from '../../redux/actions/AuthenticationActions'
import { connect } from 'react-redux'
import axios from 'axios'

class Register extends Component {
  constructor() {
    super();
    this.state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }
}

componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
  }
}

onChange = (e) => {
   this.setState({[e.target.name]: e.target.value})
}

onSubmit = (e) => {
  e.preventDefault()
  const newUser = {
      name: this.state.name, 
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
  }
  console.log(newUser)
  // axios.post('/userAuthentication/register')
  //    .then(res => console.log(res))
  //    .catch(err =>  console.log(err))
  this.props.registerUser(newUser, this.props.history)

}

    render() {
      const { errors } = this.state;
      return (
        <div>
        <RegularBanner />
        <div className = "registerContainer">
        
          <form className="ui form" onSubmit = {this.onSubmit}>
                                <div className="field">
                                    <label>Name</label>


                                    <input type="text" 
                                           placeholder="Name" 
                                           name="name" 
                                           aria-label="Name" 
                                           autoComplete="off" 
                                           value = {this.state.name}
                                           onChange = {this.onChange}
                                                                 
                                    /> 
                                    <div className = "inputError">
                                            {errors.name }
                                </div>



                                    </div>
                                <div className="field">
                                    <label> Email </label>


                                    <input type="text" 
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
                                    <label> Type Password Again </label>
                                    <input type="password" 
                                           placeholder="Type Password Again" 
                                           name="password2" 
                                           id="okta-signin-password2" 
                                           aria-label="Password2" 
                                           autoComplete="off" 
                                           value = {this.state.password2}
                                           onChange = {this.onChange}
                                    />   

                                    <div className = "inputError">
                                          {errors.password2 }
                                    </div>      
                                                                  


                              </div>
                                    <button className="ui button" type="submit">Submit</button>
          </form>
           
        </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(Register);