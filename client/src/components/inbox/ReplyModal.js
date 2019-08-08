import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Inbox.css'
import RegularBanner from '../banner/RegularBanner'
import queryString from "query-string";
import axios from 'axios'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import Moment from 'react-moment';
import Messages from './Messages'
import Modal from 'react-modal';


const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};


class ReplyModal extends Component {
   

    constructor(props) {
        super(props)
        console.log(props)
       
            this.state = {
                email: this.props.receiver_email,
                subject: this.props.subject,
                message: this.props.message,
                saveAsDraft: false,

                errors: {}
            }

        
       
    }

    onChange = (e) => {
      
        this.setState({[e.target.name]: e.target.value})
       
    } 

    handleEmailPropsChange = (e) => {
        this.props.receiver_email(e.target.value);
    }

    toggleSaveAsDraft = () => {
        this.setState({
            saveAsDraft: !this.state.saveAsDraft,
        });
      }

      onSubmit = (e) => {
                e.preventDefault()
               
                var receiver_email = this.state.email
                var subject = this.state.subject
                var message = this.state.message
                var sender_email = this.props.auth.user.email
                var sender_name = this.props.auth.user.name
                var data
                var isDraft = []
                if (this.state.saveAsDraft) {
                    isDraft.push({email: this.props.auth.user.email})
                    data = {
                        sender_email,
                        sender_name,
                        receiver_email,
                        subject,
                        message,
                        isDraft
                        
                    }
                } else {
                    data = {
                        sender_email,
                        sender_name,
                        receiver_email,
                        subject,
                        message
                    
                    }
                }

                console.log(data)

                if (message && subject && receiver_email) {
                    axios.post('/message/sendMessage', data) 
                        .then(res => {
                            console.log(res)
                          
                               var message_id_array = []
                               message_id_array.push(this.props.message_id)

                                var delete_data = {
                                    message_id: message_id_array,
                                    email: this.props.auth.user.email
                                }
                               
                                axios.post('/message/deleteMessage', delete_data) 
                                   .then(res => {
                                       console.log(res)
                                       window.location.reload()
                                    })
                                   .catch(err => console.log(err))
                           
                           
                        })
                        .catch(err => console.log(err))
                } else {

                    if (!receiver_email) {
                        alert("Please input email")
                    }

                    if (!subject) {
                        alert("Please input subject")
                    }
                    if (!message) {
                        alert("Please input message")
                    }
                   
                }
      }

    render() {
       
        
        return (
          <div>
           
            <Modal
              isOpen={this.props.isOpen}
              onAfterOpen={this.props.onAfterOpen}
              onRequestClose={this.props.onRequestClose}
              style={customStyles}
              contentLabel="Example Modal"
            >

            <div className = "email_user_container">
                <form onSubmit = {this.onSubmit} className="ui form">
                <div className="field">
                <label> Email </label>
                {this.props.isDraft.some(e => e.email === this.props.auth.user.email) && this.props.isEdit ? 
                    <input type="text" name="email" placeholder="Email Address"  value = {this.state.email} onChange = {this.onChange}/>
                    : 
                    <input type="text" name="email" placeholder="Email Address"   onChange = {this.onChange}/>
                }
                </div>
                <div className="field">
                <label> Subject </label>
                {this.props.isDraft.some(e => e.email === this.props.auth.user.email) && this.props.isEdit ? 
                    <input type="text" name="subject" placeholder="Subject" value = {this.state.subject} onChange = {this.onChange}/>
                    : 
                    <input type="text" name="subject" placeholder="Subject"  onChange = {this.onChange}/>

                }
                </div>

                <div className="field">
                   <label for="comment">Message</label>
                {this.props.isDraft.some(e => e.email === this.props.auth.user.email) && this.props.isEdit ? 
                     <textarea className="form-control" name = "message" rows="7" id="comment" value = {this.state.message} onChange = {this.onChange}></textarea>

                    : 
                    <textarea className="form-control" name = "message" rows="7" id="comment"  onChange = {this.onChange}></textarea>
                }
                </div>

                <div className="field">
                
                </div>
                <button className="ui button" type="submit">Submit</button>
                <span className="save_as_draft">
                <div className="ui read-only checkbox">
                   <input type="checkbox" checked={this.state.saveAsDraft} onChange={this.toggleSaveAsDraft}/>
                <label>Save as draft</label>
               </div>
               </span>
                
                <div className="space">
                
                </div>

                                 



                </form>
          </div>
    
             

             
            </Modal>
          </div>
        );
      }


   

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(ReplyModal)