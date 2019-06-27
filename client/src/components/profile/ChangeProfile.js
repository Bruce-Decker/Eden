import axios from 'axios'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import RegularBanner from '../banner/RegularBanner'
import { connect } from 'react-redux'
import './ChangeProfile.css'
import LocationPicker from 'react-location-picker';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

class ChangeProfile extends Component {
    constructor() {
        super()
        this.state = {
            file: null,
            first_name: '',
            last_name: '',
            DOB: '',
            gender: '',
            email: '',
            phone_number: '',
            city: '',
            country: '',
            company: '',
            about_me: '',
            address: "",
            position: {
               lat: 37.7749,
               lng: -122.4194
            },
            errors: {}
        }
    }

    handleChange = address => {
        this.setState({ address });
      };

      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
             
              this.setState({
                 position: latLng
              })
              console.log('Success', this.state.position)
          })
          .catch(error => console.error('Error', error));
      };

    handleLocationChange = ({ position, address }) => {
 
        // Set new location
        this.setState({ position, address });
      }

    onChange = (e) => {
      
        this.setState({[e.target.name]: e.target.value})
    } 

    onSubmit = (e) => {
        e.preventDefault()
        let file = this.state.file
        let formdata = new FormData()
        formdata.append('first_name', this.state.first_name)
        formdata.append('last_name', this.state.last_name)
        formdata.append('email', this.props.auth.user.email)
        formdata.append('filename', file)
        formdata.append('DOB', this.state.DOB)
        formdata.append('gender', this.state.gender)
       
        formdata.append('phone_number', this.state.phone_number)
        formdata.append('address', this.state.address)
        formdata.append('city', this.state.city)
        formdata.append('country', this.state.country)
        formdata.append('company', this.state.company)
        formdata.append('about_me', this.state.about_me)
        formdata.append('address', this.state.address)
        formdata.append('longitude', this.state.position.lat)
        formdata.append('latitude', this.state.position.lng)

        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        // this.props.createProfile(formdata)
        console.log(formdata)
         axios.post('/profile/profileUpload', formdata)
           .then(res => window.location.reload())
           .catch(err => console.log(err))
       
    }

    handleFile = event => {
        console.log('uploaded')
        let file = event.target.files[0]
        this.setState({file: file})
    }

    render() {
        const defaultPosition = {
            lat: this.state.position.lat,
            lng: this.state.position.lng
        };
        const { errors } = this.state
        return (
            <div>
             
                <div className = "ChangeProfileContainer">
                   <h1> User profile </h1>
                   <form onSubmit = {this.onSubmit} className="ui form">
                <div className="field">
                <label> First Name</label>
                <input type="text" name="first_name" placeholder="First Name"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.First_Name }
                                    </div>  

                <div className="field">
                <label> Last Name</label>
                <input type="text" name="last_name" placeholder="Last Name"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.Last_Name }
                                    </div> 

                                    <div className="field">
                <label> DOB </label>
                <input type="text" name="DOB" placeholder="Date of Birth"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.DOB }
                                    </div>  
                                    <div className="field">
                  <label> Gender </label>
                  <input type="text" name="gender" placeholder="Gender"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.Gender }
                                    </div>

                
               <div className="field">
                <label> Upload an image </label>
                <input type="file" name="filename" id="fileToUpload"  onChange = {this.handleFile}/>
                </div>

                {/* <div className="field">
                <label> Email </label>
                <input type="text" name="email" placeholder="Email"  onChange = {this.onChange}/>
                </div>

                                     <div className = "inputError">
                                            {errors.email }
                                    </div>  */}
                

                <div className="field">
                <label> Phone Number </label>
                <input type="text" name="phone_number" placeholder="Phone Number"  onChange = {this.onChange}/>
                </div>

                                     <div className = "inputError">
                                            {errors.Phone_Number }
                                    </div> 

                

               
              

                <div className="field">
                  <label> City </label>
                  <input type="text" name="city" placeholder="City"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.city }
                                    </div> 

                <div className="field">
                  <label> Country </label>
                  <input type="text" name="country" placeholder="Country"  onChange = {this.onChange}/>
                </div>

                                    <div className = "inputError">
                                            {errors.country }
                                    </div>

                <div className="field">
                  <label> Company </label>
                  <input type="text" name="company" placeholder="Company"  onChange = {this.onChange}/>
                </div>

                                    <div className = "inputError">
                                            {errors.company }
                                    </div>


                <div className="field">
                     <label>Input Location </label>
                </div>
                
                 <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
                                    type="text" 
                                    name="address"
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                  
                                    />
                                    <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                )}
         </PlacesAutocomplete>


         <div>
                            <h1>{this.state.address}</h1>
                            <div>
                            <LocationPicker
                                containerElement={ <div style={ {height: '100%'} } /> }
                                mapElement={ <div style={ {height: '400px'} } /> }
                                defaultPosition={defaultPosition}
                                onChange={this.handleLocationChange}
                                zoom = {14}
                            />
                            </div>
                  </div>

              



                <div className="field">
                   <label for="comment">About me:</label>
                <textarea className="form-control" name = "about_me" rows="5" id="comment"  onChange = {this.onChange}></textarea>
                </div>

                                  <div className = "inputError">
                                            {errors.About_Me }
                                    </div>
                
                <div className="field">
                
                </div>
                <button className="ui button" type="submit">Submit</button>
                <div className="space">
                
                </div>
            </form>
                </div>
               
            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(ChangeProfile)