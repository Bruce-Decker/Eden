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
import { Dropdown } from 'react-bootstrap'

Modal.setAppElement('#root')

class Messages extends Component {
    constructor(props) {
        super()
        this.state = {
            selected_message_ids: [],
            tempSelected_message_ids: [],
            selectAll: false
        }
    }


    increasePageNumber = (page_number, page_limit, total_messages, page_size) => { 
     
    var projected_num = (parseInt(page_number) + 1) * parseInt(page_limit) 
   
        if (projected_num < total_messages) {
                page_number = parseInt(page_number) + 1
                if (this.props.type == "individual") {
                    this.props.history.push("/inbox/" + this.props.auth.user.email + "/" + page_number + "?emailType=" + this.props.emailType)
                } else {
                    this.props.history.push("/inbox/" + this.props.auth.user.email + "/" + page_number + "?emailType=" +  this.props.emailType + "&searchTerm=" + this.props.searchTerm)
                }
                //window.location.reload()
                this.props.onMessage()
        }

    }

    decreasePageNumber = (page_number) => { 
       
         
            page_number = parseInt(page_number) - 1
            if (page_number >= 0) {
                if (this.props.type == "individual") {
                   this.props.history.push("/inbox/" + this.props.auth.user.email + "/" + page_number + "?emailType=" +  this.props.emailType)
                } else {
                    this.props.history.push("/inbox/" + this.props.auth.user.email + "/" + page_number + "?emailType=" +  this.props.emailType + "&searchTerm=" + this.props.searchTerm)
                }
                //window.location.reload()
                this.props.onMessage()
            }
       
     }

     refresh = () => {
         //window.location.reload()
         this.props.onMessage()
     }

     checkAllBox = () => {
     if (!this.state.selectAll) {
        this.props.messages.map(message => {
            console.log(message.message_id)
            this.state.selected_message_ids.push(message.message_id)
            
        })
     } else {
        this.state.selected_message_ids = []
     }
        this.setState({
            selectAll:  !this.state.selectAll
        })
     }

    trashMessages = () => {
       
        var message_id_array = []
        this.state.selected_message_ids.map(id => {
            message_id_array.push(id)
        })

        var data = {
            message_id: message_id_array,
            email: this.props.auth.user.email
        }

        axios.post('/message/trashMessage', data)
            .then(res => {
                console.log(res.data)
                //window.location.reload()
                this.props.onMessage()
            })
            .catch(err => console.log(err))
       
       
     }


     deleteMessages = () => {
       
        var message_id_array = []
        this.state.selected_message_ids.map(id => {
            message_id_array.push(id)
        })

        var data = {
            message_id: message_id_array,
            email: this.props.auth.user.email
        }

        axios.post('/message/deleteMessage', data)
            .then(res => {
                console.log(res.data)
                //window.location.reload()
                this.props.onMessage()
            })
            .catch(err => console.log(err))
       
       
     }

   


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
                //window.location.reload()
                this.props.onMessage()
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
                //window.location.reload()
                this.props.onMessage()
            })
            .catch(err => console.log(err))
    }

    showIndividualMessage = (e, message_id) => {
       this.props.history.push('/inbox/' + this.props.auth.user.email + "/individual/" + "?emailType=readEachEmail&message_id=" + message_id)
    }


  

    render() {
       
        return (
            <div>

            <div className="mail-option">
                <div className="chk-all">
                  <input type="checkbox" className="mail-checkbox mail-group-checkbox" onChange = {this.checkAllBox}/>
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
                <div className="btn-group" onClick = {this.refresh}>
                  <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="#" className="btn mini tooltips">
                    <i className=" fa fa-refresh" />
                  </a>
                </div>
               
                

                <div className="btn-group">
                  <a data-toggle="dropdown" href="#" className="btn mini blue">
                  
                  {this.props.emailType !== "trash" ?
                    <div href="#" onClick = {this.trashMessages}><i className=" fa fa-trash-o" /> Trash</div>

                    : 
                    <div href="#" onClick = {this.deleteMessages}><i className=" fa fa-trash-o" /> Delete</div>
             }
                  </a>
                  
                </div>



                <ul className="unstyled inbox-pagination">
                   
                  <li>
                     
                      <span>

                         {parseInt(this.props.total_messages) !== 0 ? 
                    
                             parseInt(this.props.page_number) * parseInt(this.props.page_limit) + 1   
                              
                            : null }
                            { (parseInt(this.props.page_number) + 1) * parseInt(this.props.page_limit) >= parseInt(this.props.total_messages)
                            ?

                                        <span>
                                            {parseInt(this.props.page_size) !== 1 ? 
                                       
                                            - this.props.total_messages
                                            : null }
                                        </span>

                             :  
                              
                                 - (parseInt(this.props.page_number) + 1) * parseInt(this.props.page_limit)}
                                
                              {" "}  of  {" total "}
                            {this.props.total_messages}
                      </span>
                    </li>
                  <li>
                    <a className="np-btn" onClick = {() => this.decreasePageNumber(this.props.page_number)}><i className="fa fa-angle-left  pagination-left" /></a>
                  </li>
                  <li>
                    <a className="np-btn"  onClick = {() => this.increasePageNumber(this.props.page_number, this.props.page_limit, this.props.total_messages, this.props.page_size)}><i className="fa fa-angle-right pagination-right" /></a>
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
                                                  
                                                      <input key = {message.message_id} type="checkbox" className="mail-checkbox" onChange = {(e) => this.checkTrash(e, message.message_id)} checked={this.state.selected_message_ids.includes(message.message_id)}/>
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
                                                  <input type="checkbox" className="mail-checkbox" onChange = {(e) => this.checkTrash(e, message.message_id)} checked={this.state.selected_message_ids.includes(message.message_id)}/>
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