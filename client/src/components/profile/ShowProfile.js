import axios from 'axios'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import RegularBanner from '../banner/RegularBanner'
import { connect } from 'react-redux'
import './ShowProfile.css'


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
                about_me: ''
        }
    }

    async componentDidMount() {
        const response = await axios.get('/profile/' + this.props.auth.user.email)
        console.log(response.data[0])
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
            about_me: response.data[0].about_me
        })

    }

    render() {
        const { errors } = this.state
        return (
            <div>
               <RegularBanner />
               <div className = "ShowProfileContainer">
               <img src = { this.state.image_path} height = "190" width = "220" />
               <h3>First Name: {this.state.first_name}</h3>
               <h3>Last Name: {this.state.last_name}</h3>
               <h3>Date of Birth: {this.state.DOB}</h3>
               <h3>Gender: {this.state.gender}</h3>
               <h3>Email: {this.state.email}</h3>
               <h3>Phone Number: {this.state.phone_number}</h3>
               <h3>Address: {this.state.address}</h3>
               <h3>City: {this.state.city}</h3>
               <h3>Country: {this.state.country}</h3>
               <h3>Company: {this.state.company}</h3>
               <h3>About Me: {this.state.about_me}</h3>
                
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