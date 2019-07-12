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
import ComposeModal from './ComposeModal'
import Modal from 'react-modal';

Modal.setAppElement('#root')

class Messages extends Component {
    constructor(props) {
        super()
        this.state = {
            selected_message_ids: []
        }
    }

    trashMessages = () => {
        alert("fdssdfdsf")
        this.state.selected_message_ids.map(id => {
            console.log(id)
        })
       
       
     }


    //  selectTrashMessages = (e, message_id) => {
    //     e.stopPropagation();
    //    const trashed_message_ids = this.state.trashed_message_ids
    //    let newArr = []
    //    if (!trashed_message_ids.includes(message_id)) {
    //       newArr = [...trashed_message_ids, message_id]
    //    } else {
    //        newArr = trashed_message_ids.filter(a => a !== message_id);
    //    }

    //    this.setState({ trashed_message_ids: newArr }, () => console.log('updated state', newArr))
    // }

    preventTrigger = e => {
        e.stopPropagation();
    }

    checkTrash = (e, message_id) => {
        e.stopPropagation();
        console.log(message_id)
        const selected_message_ids = this.state.selected_message_ids
            let newArr = []
     if (!selected_message_ids.includes(message_id)) {
          newArr = [...selected_message_ids, message_id]
       } else {
           newArr = selected_message_ids.filter(a => a !== message_id);
       }

       this.setState({ selected_message_ids: newArr }, () => console.log('updated state', newArr))

        
    }


    // checkTrash = (e, message_id) => {
    //     e.stopPropagation();
    //     //const trashed_message_ids = this.state.trashed_message_ids
    //    let newArr = []
    //    if (!this.state.trashed_message_ids.includes(message_id)) {
    //       newArr = [...this.state.trashed_message_ids, message_id]
    //    } else {
    //        newArr = this.state.trashed_message_ids.filter(a => a !== message_id);
    //    }

    //    this.setState({ {this.state.trashed_message_ids}: newArr }, () => console.log('updated state', newArr))
    // }

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
            <div>

            <div className="mail-option">
                <div className="chk-all">
                  <input type="checkbox" className="mail-checkbox mail-group-checkbox" />
                  <div className="btn-group">
                    <a data-toggle="dropdown" href="#" className="btn mini all" aria-expanded="false">
                      All
                      <i className="fa fa-angle-down " />
                    </a>
                    <ul className="dropdown-menu">
                      <li><a href="#"> None</a></li>
                      <li><a href="#"> Read</a></li>
                      <li><a href="#"> Unread</a></li>
                    </ul>
                  </div>
                </div>
                <div className="btn-group">
                  <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="#" className="btn mini tooltips">
                    <i className=" fa fa-refresh" />
                  </a>
                </div>
                <div className="btn-group hidden-phone">
                  <a data-toggle="dropdown" href="#" className="btn mini blue" aria-expanded="false">
                    More
                    <i className="fa fa-angle-down " />
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#"><i className="fa fa-pencil" /> Mark as Read</a></li>
                    <li><a href="#"><i className="fa fa-ban" /> Spam</a></li>
                    <li className="divider" />
                    <li><a href="#"><i className="fa fa-trash-o" /> Delete</a></li>
                  </ul>
                </div>
                <div className="btn-group">
                  <a data-toggle="dropdown" href="#" className="btn mini blue">
                    Move to
                    <i className="fa fa-angle-down " />
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#"><i className="fa fa-pencil" /> Mark as Read</a></li>
                    <li><a href="#"><i className="fa fa-ban" /> Spam</a></li>
                    <li className="divider" />
                    <li><a href="#"><i className="fa fa-trash-o" /> Delete</a></li>
                  </ul>
                </div>
                

                <div className="btn-group">
                  <a data-toggle="dropdown" href="#" className="btn mini blue">
                  
                    <div href="#" onClick = {this.trashMessages}><i className=" fa fa-trash-o" /> Trash</div>
                  </a>
                  
                </div>



                <ul className="unstyled inbox-pagination">
                  <li><span>1-50 of 234</span></li>
                  <li>
                    <a className="np-btn" href="#"><i className="fa fa-angle-left  pagination-left" /></a>
                  </li>
                  <li>
                    <a className="np-btn" href="#"><i className="fa fa-angle-right pagination-right" /></a>
                  </li>
                </ul>
              </div>
        <div className="div-inbox">


              
                    {this.props.messages.map(message => 
                     <Card className = "eachMessageItem" onClick = {(e) => this.showIndividualMessage(e, message.message_id)}>
                        <div>
                             {message.isRead.some(e => e.email === this.props.auth.user.email) ? 
                                    <div className = "readMessage">
                                      <div className = "firstInboxContainer">
                                              <div className="inboxCheckBox" onClick = {(e) => this.preventTrigger(e)}>
                                                      <input type="checkbox" className="mail-checkbox" onChange = {(e) => this.checkTrash(e, message.message_id)}/>
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
                                          <div className="inboxCheckBox" onClick = {(e) => this.preventTrigger(e)}>
                                                  <input type="checkbox" className="mail-checkbox" onChange = {(e) => this.checkTrash(e, message.message_id)}/>
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
              </div>
        )
    }


}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(Messages)