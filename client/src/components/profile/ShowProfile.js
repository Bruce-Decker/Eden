import axios from 'axios'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import RegularBanner from '../banner/RegularBanner'
import { connect } from 'react-redux'
import './ShowProfile.css'
import { Card } from 'react-bootstrap'


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
                showProfile: false,
                share_post: '',
                posts: []
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    handleClick = () => {
         
         var post = this.state.share_post
         var name = this.props.auth.user.name
         var email = this.props.auth.user.email
         var profile_owner_email = this.props.match.params.email
         var data = {
             post,
             name,
             email,
             profile_owner_email
         }

         axios.post('/profile/sharePost', data)
              .then(res => {
                  console.log(res)
                  window.location.reload()
              })
              .catch(err => console.log(err))
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
                    showProfile: true,
                    posts: response.data[0].posts
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
                                      
                                        <textarea  name = "share_post" onChange = {this.onChange}></textarea>
                                    </div>
                            </div>
                           
                                    <button type="button" id="share_button_tree" onClick={this.handleClick}>Share</button>
                               
                             
                      </Card> 

                      <div className = "showPosts">
                          <div className = "space">

                         </div>
                        <Card >

                {this.state.showProfile ? 
                <div>


               
                     {this.state.posts.map(post =>
                              <div className="container bootstrap snippet">
                              <div className="col-sm-12">
                                <div className="panel panel-white post panel-shadow">
                                  <div className="post-heading">
                                    <div className="pull-left image">
                                     
                                      <img src={`/images/${post.email}.jpg`} className="img-circle avatar" alt="user profile image" />
                                    </div>
                                    <div className="pull-left meta">
                                      <div className="title h5">
                                        <a href="#"><b>{post.name} </b></a>
                                        made a post.
                                      </div>
                                      <h6 className="text-muted time">{post.time}</h6>
                                    </div>
                                  </div> 
                                  <div className="post-description"> 
                                    <p>{post.post}</p>
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
                                    {post.comments.map(comment => 
                                    <ul className="comments-list">
                                      <li className="comment">
                                        <a className="pull-left" href="#">
                                          {/* <img className="avatar" src="https://bootdey.com/img/Content/user_1.jpg" alt="avatar" /> */}

                                          <img src={`/images/${comment.email}.jpg`} className="img-circle avatar" alt="user profile image" />
                                        </a>
                                       
                                            <div className="comment-body">
                                            <div className="comment-heading">
                                                <h4 className="user">{comment.name}</h4>
                                                <h5 className="time">{comment.time}</h5>
                                            </div>
                                            <p>{comment.comment}</p>
                                            </div>
                                      
                                        {/* <ul className="comments-list">
                                          <li className="comment">
                                            <a className="pull-left" href="#">
                                              <img className="avatar" src="https://bootdey.com/img/Content/user_3.jpg" alt="avatar" />
                                            </a>
                                            <div className="comment-body">
                                              <div className="comment-heading">
                                                <h4 className="user">Ryan Haywood</h4>
                                                <h5 className="time">3 minutes ago</h5>
                                              </div>
                                              <p>Relax my friend</p>
                                            </div>
                                          </li> 
                                          <li className="comment">
                                            <a className="pull-left" href="#">
                                              <img className="avatar" src="https://bootdey.com/img/Content/user_2.jpg" alt="avatar" />
                                            </a>
                                            <div className="comment-body">
                                              <div className="comment-heading">
                                                <h4 className="user">Gavino Free</h4>
                                                <h5 className="time">3 minutes ago</h5>
                                              </div>
                                              <p>Ok, cool.</p>
                                            </div>
                                          </li> 
                                        </ul> */}
                                      </li>
                                    </ul>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className = "space">
                                  </div>
                            </div>
                                   
                            )}
                             </div>
                            : null }

                        </Card>
                      </div>
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