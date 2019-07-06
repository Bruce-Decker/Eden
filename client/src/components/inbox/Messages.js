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


class Messages extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
        <div className="div-inbox">
              
                    {this.props.messages.map(message => 
                     <Card className = "eachMessageItem">
                        <div>
                             {message.isRead ? 
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
                                          {message.isStarred ?
                                            <div className="floatLeft inboxStar">
                                                <i className="fa fa-star inbox-started" />
                                              </div>
                                            :
                                            <div className="floatLeft inboxStar">
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