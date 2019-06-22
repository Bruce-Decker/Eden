import axios from 'axios'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import RegularBanner from '../banner/RegularBanner'
import { connect } from 'react-redux'
import './ShowProfile.css'
import { Card } from 'react-bootstrap'
import { FacebookProvider, Share, Comments  } from 'react-facebook';

class ShowProfile extends Component {
    constructor() {
        super()
        this.state = {
                image_path: '',
                first_name: '',
                last_name: '',
                DOB: '',
                gender: '',
                email: '',
                phone_number: '',
                address: '',
                city: '',
                country: '',
                company: '',
                about_me: '',
                showProfile: false
        }
    }

    handleClick = () => {
         alert("clicked")
    }

    async componentDidMount() {
        const response = await axios.get('/profile/' + this.props.match.params.email)
        console.log(response.data[0])
        if (response.data[0]) {
                this.setState({
                    image_path: response.data[0].profile_picture_path,
                    first_name: response.data[0].first_name,
                    last_name: response.data[0].last_name,
                    DOB: response.data[0].DOB,
                    gender: response.data[0].gender,
                    email: response.data[0].email,
                    phone_number: response.data[0].phone_number,
                    address: response.data[0].address,
                    city: response.data[0].city,
                    country: response.data[0].country,
                    company: response.data[0].company,
                    about_me: response.data[0].about_me,
                    showProfile: true
                })
       }

    }

    render() {
        const { errors } = this.state
        return (
            <div>
               <RegularBanner />
               <div className = "ShowProfileContainer">
              {this.state.showProfile ? 
                       <Card>
                            <img src = { this.state.image_path} height = "250" width = "300" />
                            <Link to = "/changeProfile"> <h4> <i class="fas fa-user"></i> Edit Profile </h4>  </Link>
                            <div className = "sorts_mill_goudy_font">
                                <h5>First Name: {this.state.first_name}</h5>
                                <h5>Last Name: {this.state.last_name}</h5>
                                <h5>Date of Birth: {this.state.DOB}</h5>
                                <h5>Gender: {this.state.gender}</h5>
                                <h5>Email: {this.state.email}</h5>
                                <h5>Phone Number: {this.state.phone_number}</h5>
                                <h5>City: {this.state.city}</h5>
                                <h5>Country: {this.state.country}</h5>
                                <h5>Company: {this.state.company}</h5>
                                <h5>About Me: {this.state.about_me}</h5>
                            </div>
                      </Card> 
                    : null }
                
               </div>
               <div className = "ShowProfileWallContainer">
              
                       <Card>
                       <div class="non-semantic-protector"> 
                            <h1 class="ribbon">
                              <strong className="ribbon-content ribbon_font">Share something today!</strong>
                            </h1>
                        </div>
                        <div class="profile_space1">
                        </div> 
                        <div class="profile_space2">
                        </div> 
                        
                             <div class="ui form">
                                    <div class="field">
                                      
                                        <textarea></textarea>
                                    </div>
                            </div>
                           
                                    <button type="button" onClick={this.handleClick}>Share</button>
                               
                             
                      </Card> 
               </div>


            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(ShowProfile)