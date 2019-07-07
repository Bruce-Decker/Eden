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
import { withRouter } from 'react-router-dom';

class Messages extends Component {
    constructor(props) {
        super()
    }

    starMessage = (e, message_id) => {
        e.stopPropagation();
        var email = this.props.auth.user.email
        var data = {
            message_id,
            email
        }
        console.log(data)
        axios.post('/message/starMessage', data)
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    unstarMessage = (e, message_id) => {
        e.stopPropagation();
        var email = this.props.auth.user.email
        var data = {
            message_id,
            email
        }
        console.log(data)
        axios.post('/message/unstarMessage', data)
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    showIndividualMessage = (e, message_id) => {
       this.props.history.push('/inbox/' + this.props.auth.user.email + "?emailType=readEachEmail&message_id=" + message_id)
    }

    render() {
        return (
        <div className="div-inbox">
              
                    {this.props.messages.map(message => 
                     <Card className = "eachMessageItem" onClick = {(e) => this.showIndividualMessage(e, message.message_id)}>
                        <div>
                             {message.isRead.some(e => e.email === this.props.auth.user.email) ? 
                                    <div className = "readMessage">
                                      <div className = "firstInboxContainer">
                                              <div className="inboxCheckBox">
                                                      <input type="checkbox" className="mail-checkbox" />
                                              </div>
                                              {message.isStarred ?
                                                <div className="floatLeft inboxStar">
                                                    <i className="fa fa-star inbox-started" />
                                                  </div>
                                                :
                                                <i className="fa fa-star unstar"/>
                                              }
                                              <h3 className = "inboxReadNameFont" > {message.sender_name}</h3>
                                              {/* <div>
                                                  <h3 className = "inboxReadNameFont" > {message.sender_name}</h3>
                                                
                                                  
                                                
                                              </div> */}
                                      </div>
                                      <div className = "secondInboxContainer">
                                          <h3 className = "inboxReadNameFont"> {message.subject}</h3>
                                       </div>

                                       <div className = "thirdInboxContainer">
                                          <h3 className = "thirdInboxReadNameFont"> 
                                            
                                             <Moment format="HH:mm MM/DD/YYYY">{message.time}</Moment> 
                                             
                                          </h3>
                                       </div>
                                      
                                      

                                    </div>
                            
                                   : 

                                    <div className = "readMessage">
                                       <div className = "firstInboxContainer">
                                          <div className="inboxCheckBox">
                                                  <input type="checkbox" className="mail-checkbox" />
                                          </div>
                                          {message.isStarred.some(e => e.email === this.props.auth.user.email) ?
                                            <div className="floatLeft inboxStar"  onClick = {(e) =>  this.unstarMessage(e, message.message_id)}>
                                                <i className="fa fa-star inbox-started" />
                                              </div>
                                            :
                                            <div className="floatLeft inboxStar" onClick = {(e) =>  this.starMessage(e, message.message_id)}>
                                              <i className="fa fa-star unstar"/>
                                            </div>
                                          }
                                          
                                          <h3 className = "inboxUnreadNameFont" id = "inboxUnreadNameFontSpace"> {message.sender_name}</h3>
                                       </div>
                                  <div className = "secondInboxContainer">
                                           <h3 className = "inboxUnreadNameFont"> {message.subject}</h3>
                                  </div>
                                  <div className = "thirdInboxContainer">
                                          <h3 className = "thirdInboxUnreadNameFont"> 
                                            
                                             <Moment format="HH:mm MM/DD/YYYY">{message.time}</Moment> 
                                             
                                          </h3>
                                       </div>

                                </div>
                            
                            
                             }
                            
                           
                        </div>    
                         </Card>
                    )}
                 
              </div>
        )
    }


}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(Messages)