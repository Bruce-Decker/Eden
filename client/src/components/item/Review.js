import React, { Component } from 'react';
import './Item.css';
import LocationPicker from 'react-location-picker';
import apple from '../../images/apple.png'
import star from '../../images/rating.png'
import map from '../../images/map.jpg'
import axios from 'axios'
import  delete_icon  from './delete_icon.png'
import { connect } from 'react-redux'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


const reviews = [
  {
    user: 'John',
    img: apple,
    review: 'Apples are extremely rich in important antioxidants, flavanoids, and dietary fiber. The phytonutrients and antioxidants in apples may help reduce the risk of developing cancer, hypertension, diabetes, and heart disease.',
    date: '2 days ago',
    rating: [1, 2, 3, 4]
  },
  {
    user: 'Bob',
    img: apple,
    review: 'Apples are high in fiber and water — two qualities that make them filling.',
    date: '6 days ago',
    rating: [1, 2, 3]
  },
]

var defaultPosition

class Review extends Component {

  constructor(props){
    super(props)
    this.state = {
   
      position: {
         lat: 37.7749,
         lng: -122.4194
      },
      showReviews: false
  }
  }

  async componentDidMount() {
    const response = await axios.get('/items/' + this.props.item_id)
    console.log(response.data[0].latitude)
    console.log(typeof(response.data[0].latitude))
   if (response.data[0]) {
        this.setState({
          item: response.data[0],
          position: {
             lat: response.data[0].longitude,
             lng: response.data[0].latitude
          },
          showReviews: true,
          comments: response.data[0].comments
      })
      
   }
  
   
  }

  render() {
    const defaultPosition = {
      lat: this.state.position.lat,
      lng: this.state.position.lng
  };
  
    return (
      <div class="container-review">
      
          <div className = "itemReview">
          <div class="item-header">Reviews </div>
             {this.state.showReviews ?
             <div>
               {this.state.comments.map(comment => 
                    <div className="container bootstrap snippet">
                    <div className="col-sm-8">
                      <div className="panel panel-white post panel-shadow">
                        <div className="post-heading">
                          <div className="pull-left image">

                          <img src={`/images/${comment.email}.jpg`} className="img-circle avatar" alt="user profile image" />
                         
                          </div>
                          <div className="pull-left meta">
                            <div className="title h5">
                            <a href="#"><b>{comment.name} </b></a>
                                        made a review.
                            </div>
                            <h6 className="text-muted time">{comment.time}</h6>
                          </div>

                          {comment.email === this.props.auth.user.email ?
                                                   <img src = {delete_icon} className = "profile_delete_icon" onClick = {() => this.deleteComment(comment.comment_id)} height="15" width="15"/>  
                                                    : null }
                        </div> 
                        <div className="post-description"> 
                          <p>Bootdey is a gallery of free snippets resources templates and utilities for bootstrap css hmtl js framework. Codes for developers and web designers</p>
                          <div className="stats">
                            <a href="#" className="btn btn-default stat-item">
                              <i className="fa fa-thumbs-up icon" />2
                            </a>
                            <a href="#" className="btn btn-default stat-item">
                              <i className="fa fa-share icon" />12
                            </a>
                          </div>
                        </div>
                        <div className="post-footer">
                          <div className="input-group"> 
                            <input className="form-control" placeholder="Add a comment" type="text" />
                            <span className="input-group-addon">
                              <a href="#"><i className="fa fa-edit" /></a>  
                            </span>
                          </div>
                          <ul className="comments-list">
                            <li className="comment">
                              <a className="pull-left" href="#">
                                <img className="avatar" src="https://bootdey.com/img/Content/user_1.jpg" alt="avatar" />
                              </a>
                              <div className="comment-body">
                                <div className="comment-heading">
                                  <h4 className="user">Gavino Free</h4>
                                  <h5 className="time">5 minutes ago</h5>
                                </div>
                                <p>Sure, oooooooooooooooohhhhhhhhhhhhhhhh</p>
                              </div>
                             
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>


                    <div className = "space">
                                  </div>

                  </div>
                  
               )}
                  </div>
                  : null }
                  
              </div>
      <div className = "eachItemMap">
              <LocationPicker
                                
                                    containerElement={ <div style={ {height: '100%'} } /> }
                                    mapElement={ <div style={ {height: '400px'} } /> }
                                    defaultPosition={defaultPosition}
                                    onChange={this.handleLocationChange}
                                    zoom = {14}
                                />
                                </div>
        
      
        <div class="row" style={{marginTop: "1rem"}}>
          
          
        
           
              {/* <LocationPicker
                                    containerElement={ <div style={ {height: '100%'} } /> }
                                    mapElement={ <div style={ {height: '400px'} } /> }
                                    defaultPosition={defaultPosition}
                                    onChange={this.handleLocationChange}
                                    zoom = {14}
                                /> */}
                                
         
         
          <div class="col-7">
            <ul class="item-review-list">
              {reviews.map(review => {
                return (
                  <li key={review.user} class="item-review-item row">
                    <div class="col-3">
                      <img class="item-recommendation-img" style={{width: "100%"}} src={review.img} alt="Item"></img>
                      <div class="item-recommendation-title">{review.user}</div>
                    </div>
                    <div class="col-6">
                      <div>{review.review}</div>
                      <div>
                        {review.rating.map(i => {
                          return <img key={i} class="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                        })}
                      </div>
                      <div style={{marginTop: "1rem", color: "#888888"}}>{review.date}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps)(Review)