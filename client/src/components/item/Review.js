import React, { Component } from 'react';
import './Item.css';
import LocationPicker from 'react-location-picker';
import apple from '../../images/apple.png'
import star from '../../images/rating.png'
import map from '../../images/map.jpg'
import axios from 'axios'
import  delete_icon  from './delete_icon.png'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import Modal from 'react-modal';
import StarRatingComponent from 'react-star-rating-component';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroller';
import  loading_icon  from './loading.gif';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "700px",
    height: "320px",
    backgroundColor: 'rgba(0,0,0,.6)'
  }
};

const customStyles2 = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    height: "190px",
    backgroundColor: "rgb(48,48,48)"
  }
};

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

Modal.setAppElement("#root");

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 37.7749,
        lng: -122.4194
      },
      showReviews: false,
      reply: '',
      comment: '',
      comments: [],
      scroll_comments: [],
      hasMore: true,
      modalIsOpen: false,
      anonymous: false,
      rating: 5,
      hasCommented: false,
      existing_comment_id: ""
    };

    this.toal_comments = null;
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  submitComment = () => {
    var comment = this.state.comment;
    var item_id = this.props.item_id;
    var star_rating = this.state.rating;
    let data = null;
  
    if(!comment) {
      toast.error("ERROR: Please enter a review!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        newestOnTop: true,
        className: "addtocart-toast-toast",
        bodyClassName: "addtocart-toast-body",
        progressClassName: "addtocart-toast-progress",
        draggable: false,
      });
    } else {
      // always allow users to submit anonymous reviews
      if (this.state.anonymous) {
        data = {
          comment: comment,
          email: this.props.auth.user.email,
          star_rating: star_rating,
          isAnonymous: true
        }
      } else {
        // if the user is not logged in, don't allow them to submit a non-anonymous review
        if(!this.props.auth || !this.props.auth.user || !this.props.auth.user.email) {
          toast.error("ERROR: You must be logged in to submit a named review! However, you can still choose to submit an anonymous review.", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            newestOnTop: true,
            className: "addtocart-toast-toast",
            bodyClassName: "addtocart-toast-body",
            progressClassName: "addtocart-toast-progress",
            draggable: false,
          });
        } else {
          data = {
            comment: comment,
            email: this.props.auth.user.email,
            star_rating: star_rating,
            isAnonymous: false
          }
        }
      }
    }

    // only make the request if the data is set properly
    if(data) {
      axios
        .post('/items/postCommentForItem/' + item_id, data)
        .then(res => {
          console.log(res)
          this.componentDidMount()
      
          this.setState({
            modalIsOpen: false
          })
        })
        .catch(err => console.log(err))
    }
  }


  toggleSubmitAsAnonymous= () => {
    this.setState({
      anonymous: !this.state.anonymous
    });
  }

  openWriteReviewModal = () => {
    this.setState({modalIsOpen: true});
  }

  cancelModal = () => {
    this.setState({modalIsOpen: false});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  upvoteComment = (comment_id, email) => {
    var data = {
      email: email
    }

    axios
      .post('/items/upvote/' + comment_id, data)
      .then(res => {
        console.log(res)
        this.componentDidMount()
      })
      .catch(err => console.log(err))
  }

  undoUpvoteComment = (comment_id, email) => {
    var data = {
      email: email
    }

    axios
      .post('/items/undoUpvote/' + comment_id, data)
      .then(res => {
        console.log(res)
        this.componentDidMount()

      })
      .catch(err => console.log(err))
  }

  undoDownvoteComment = (comment_id, email) => {
    var data = {
      email: email
    }

    axios
      .post('/items/undoDownvote/' + comment_id, data)
      .then(res => {
        console.log(res)
        this.componentDidMount()
      })
      .catch(err => console.log(err))
  }

  downvoteComment = (comment_id, email) => {
    var data = {
      email: email
    }

    axios.post('/items/downvote/' + comment_id, data)
      .then(res => {
        console.log(res)
        this.componentDidMount()
      })
      .catch(err => console.log(err))
  }

  deleteComment = (comment_id) => {
     var data = {
      comment_id
     }

     axios
      .post('/items/deleteComment/' + this.props.item_id, data)
      .then(res => {
        console.log(res)
        this.componentDidMount()
        this.setState({
          hasCommented: false
        })

      })
      .catch(err => console.log(err))
  }

  deleteReply = (comment_id, reply_id) => {
    var data = {
      reply_id: reply_id
    }

    axios
      .post('/items/deleteReply/' + comment_id, data)
      .then(res => {
        console.log(res)
        this.componentDidMount()
      })
      .catch(err => console.log(err))
  }

  replyComment = (comment_id) => {
    if(!this.props.auth || !this.props.auth.user || !this.props.auth.user.email) {
      toast.error("ERROR: You must be logged in to comment on a review.", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        newestOnTop: true,
        className: "addtocart-toast-toast",
        bodyClassName: "addtocart-toast-body",
        progressClassName: "addtocart-toast-progress",
        draggable: false,
      });
    } else {
      let email = this.props.auth.user.email;
     
      var data = {
        email: email,
        reply: this.state.reply
      }

      axios
        .post('/items/reply/' + comment_id, data)
        .then(res => {
          console.log(res)
          this.componentDidMount()
          this.setState({reply: ''})
        })
        .catch(err => console.log(err))
    }    
  }

  async componentDidMount() {
    const response = await axios.get('/items/' + this.props.item_id)
    console.log(response.data[0].latitude)
    console.log(typeof(response.data[0].latitude))
    if (response.data[0]) {
      this.toal_comments = response.data[0].comments.length
      console.log(this.toal_comments)
      this.setState({
        item: response.data[0],
        position: {
          lat: response.data[0].longitude,
          lng: response.data[0].latitude
        },
        showReviews: true,
        comments: response.data[0].comments.reverse()
      }) 

      response.data[0].comments.map(comment => {
        if (comment.email == this.props.auth.user.email) {
          this.setState({
            hasCommented: true,
            existing_comment_id: comment.comment_id
          })
        }
      })

      var temp_array = [];
      if (this.state.comments.length > 0) {
          temp_array.push(this.state.comments[0])
          this.setState({
            scroll_comments: temp_array,
          })
      } else {
        this.setState({
          scroll_comments: this.state.comments
        })
      }
    }

    this.loadFunc();
  }

  loadFunc = () => {
    console.log("loadFunc");
    var temp_comments = this.state.comments.slice(this.state.scroll_comments.length, this.state.scroll_comments.length + 1);
    
    if (this.toal_comments) {
      if (this.state.scroll_comments.length < this.toal_comments) {
        console.log("succesfully lazy load");
        console.log(this.state.scroll_comments.length);
        this.setState({
          scroll_comments: [...this.state.scroll_comments.concat(temp_comments)],
          hasMore: true
        });
      } else {
        this.setState({
          hasMore: false
        });
      }
    }
  }

  render() {
    const { rating } = this.state;
    const defaultPosition = {
      lat: this.state.position.lat,
      lng: this.state.position.lng
    };
  
    return (
      <div class="container-review">
        <Modal
          isOpen={this.state.modalIsOpen && !this.state.hasCommented}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <textarea className="form-control" name = "comment" rows="8" id="comment"  onChange = {this.onChange}></textarea>
          <div>
            <div className="space">
                  
            </div>   
         
            <StarRatingComponent 
              name="rate1" 
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}
            
            />
          </div>
          <div className="space">
                
          </div>
          <div className="field">
                
          </div>
          <button className="ui button" type="submit" onClick = {this.submitComment}>Submit</button>
          <span className="save_as_draft">
            <div className="ui read-only checkbox">
              <input type="checkbox" checked={this.state.anonymous} onChange={this.toggleSubmitAsAnonymous}/>
              <label><b>Submit as an anonymous user</b></label>
            </div>    
          </span>
          <div className="space">
          
          </div> 
        </Modal>

        <Modal
          isOpen={this.state.modalIsOpen && this.state.hasCommented}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles2}
          contentLabel="Example Modal"
        >
          <h3 style = {{color: "white"}}>You have an existing comment for this item. Do you want to delete it? </h3>
          <div style = {{textAlign: "center", marginTop: "50px"}}>
            <button type="button" className="btn btn-danger" onClick = {() => this.deleteComment(this.state.existing_comment_id)} style = {{marginRight: "40px", height: "40px", width: "100px"}}>Delete</button>
            <button type="button" className="btn btn-primary" onClick = {this.cancelModal} style = {{height: "40px", width: "100px"}}>Cancel</button>
          </div>
        </Modal>
      
        <div className = "itemReview">
          <Card.Header>
            <div className = "upper_review_comments">
              {this.state.hasCommented ?
                <button
                  id="writeReviewBtn"
                  type="button"
                  onClick={this.openWriteReviewModal}
                  className="btn btn-primary"
                >
                  Write a review <i class="fas fa-pencil-alt"></i>
                </button>

                :
                <button
                id="writeReviewBtn"
                type="button"
                onClick={this.openWriteReviewModal}
                className="btn btn-primary"
                >
                  Write a review <i class="fas fa-pencil-alt"></i>
                </button>
              }
            </div>
            {this.state.showReviews ?
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadFunc}
                hasMore={this.state.hasMore}
                loader={<div className="loader" key={0}>
                    <img style = {{height: "100px", marginLeft: "680px"}} src = {loading_icon} />
                  </div>
                }
              >
             
                <div className = "review_comments">
                  {this.state.scroll_comments.map(comment => 
                    <div className="container bootstrap snippet">
                      <div className="col-sm-12">
                        <div className="panel panel-white post panel-shadow">
                          <div className="post-heading">
                            <div className="pull-left image">
                              {!comment.isAnonymous ?
                                <img src={`/images/${comment.email}.jpg`} className="img-circle avatar" alt="user profile image" />
                              : 
                                <img src={`/images/Anonymous.jpg`} className="img-circle avatar" alt="user profile image" />
                              }
                            </div>
                            <div className="pull-left meta">
                              <div className="title h5">
                                {!comment.isAnonymous ?
                                  <a href="#"><b>{comment.name} </b></a>
                                : 
                                  <a href="#"><b>Anonymous </b></a>
                                }
                                          made a review.
                              </div>
                              <h6 className="text-muted time">{comment.time.substring(0,10) + ' ' + comment.time.substring(11,19)}</h6>
                            </div>
                            {comment.email === this.props.auth.user.email ?
                                                   <img src = {delete_icon} className = "profile_delete_icon" onClick = {() => this.deleteComment(comment.comment_id)} height="15" width="15"/>  
                                                    : null }
                          </div> 
                          <div className="post-description"> 
                            <p>{comment.comment}</p>
                            {comment.star_rating ?
                              <StarRatingComponent 
                                  name="rate2" 
                                  editing={false}
                                  starCount={5}
                                  value={comment.star_rating}
                              />
                            :
                              <StarRatingComponent 
                               name="rate2" 
                               editing={false}
                               starCount={5}
                               value={1}
                              />
                            }
                            <div className="stats">
                              {comment.upvote.some(element => element['email'] === this.props.auth.user.email) ?
                                <button onClick = {() => this.undoUpvoteComment(comment.comment_id, this.props.auth.user.email)} className="btn btn-default stat-item">
                                  <i className="fa fa-thumbs-up icon" id = "thumb_up_blue"/>{comment.upvote.length}
                                </button>
                              : 
                                <button onClick = {() => this.upvoteComment(comment.comment_id, this.props.auth.user.email)} className="btn btn-default stat-item">
                                  <i className="fa fa-thumbs-up icon" />{comment.upvote.length}
                                </button>
                              }

                              {comment.downvote.some(element => element['email'] === this.props.auth.user.email) ?
                                <button onClick = {() => this.undoDownvoteComment(comment.comment_id, this.props.auth.user.email)} className="btn btn-default stat-item">
                                  <i className="fas fa-thumbs-down icon" id = "thumb_up_blue"/>{comment.downvote.length}
                                </button>
                              : 
                                <button onClick = {() => this.downvoteComment(comment.comment_id, this.props.auth.user.email)} className="btn btn-default stat-item">
                                  <i className="fas fa-thumbs-down icon" />{comment.downvote.length}
                                </button>
                              }
                            </div>
                          </div>
                          <div className="post-footer">
                            <div className="input-group"> 
                              <input className="form-control" placeholder="Add a comment" type="text" value = {this.state.reply} name = "reply" onChange = {this.onChange}/>
                              <span className="input-group-addon">
                                <button onClick = {() => this.replyComment(comment.comment_id)}><i className="fa fa-edit" /></button>  
                              </span>
                            </div>
                            <ul className="comments-list">
                              {comment.replies.map(reply =>
                                <li className="comment">
                                  <a className="pull-left" href="#">
                                  <img src={`/images/${reply.email}.jpg`} className="img-circle avatar" alt="img" />
                                  </a>
                                  <div className="comment-body">
                                    <div className="comment-heading">
                                      <h4 className="user">{reply.name}</h4>
                                      <h5 className="time">{reply.time.substring(0,10) + ' ' + reply.time.substring(11,19)}</h5>
                                      {reply.email === this.props.auth.user.email ?
                                                      <img src = {delete_icon} className = "profile_delete_icon"  height="15" width="15" onClick = {() => this.deleteReply(comment.comment_id, reply.reply_id)}/>  
                                                       : null }
                                    </div>
                                    <p>{reply.reply}</p>
                                  </div>
                                
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className = "space">
                      </div>
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            : null }
          </Card.Header>
        </div>
        <div class="row" style={{marginTop: "1rem"}}>
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






















