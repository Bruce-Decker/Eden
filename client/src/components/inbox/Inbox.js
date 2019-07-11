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
import ComposeModal from './ComposeModal'

var inbox_response
var sent_response
var important_response

Modal.setAppElement('#root')

class Inbox extends Component {

    constructor() {
        super()
        this.state = {
              trashed_message_ids: [],
              inboxMessages: [],
              sentMessages: [],
              importantMessages: [],
              showInboxMessage: false,
              showSentMessage: false,
              showImportantMessage: false,
              showIndividualMessage: false,
              subject: '',
              message: '',
              sender_name: '',
              sender_email: '',
              receiver_email: '',
              time: '',
              replies: [],
              modalIsOpen: false
        }
    }


    trashMessages = (message_id) => {
      alert(message_id)
     
   }


    selectTrashMessages = (e, message_id) => {
        e.stopPropagation();
       const trashed_message_ids = this.state.trashed_message_ids
       let newArr = []
       if (!trashed_message_ids.includes(message_id)) {
          newArr = [...trashed_message_ids, message_id]
       } else {
           newArr = trashed_message_ids.filter(a => a !== message_id);
       }

       this.setState({ trashed_message_ids: newArr }, () => console.log('updated state', newArr))
    }

    openModal = () => {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal = () => {
      // references are now sync'd and can be accessed.
      //this.subtitle.style.color = '#f00';
    }
  
    closeModal = () => {
      this.setState({modalIsOpen: false});
    }
  


    showIndividualMessage = (message_id) => {
       alert(message_id)
    }

   


    async componentWillReceiveProps(nextProps) {
      if (nextProps.location.search !== this.props.location.search) {    
           window.location.reload();
      }

    }


    async componentDidMount() {
         var values = queryString.parse(this.props.location.search);
         var email_selection
         var message_id
         var indivisual_message
         console.log(values)
         console.log(values["emailType"])
 
       
         for (var key in values) {
           
           if (key === "emailType") {
              email_selection = values[key]
           }
           if (key === "message_id") {
              
               message_id = values[key]
           }
         }

        
   
         inbox_response = await axios.get('/message/getInboxMessages/' + this.props.match.params.email)
         sent_response = await axios.get('/message/getSentMessages/' + this.props.match.params.email)
         important_response = await axios.get('/message/getStarredMessages/' + this.props.match.params.email)
        
         if (email_selection == "inbox" || email_selection == undefined) {
           console.log(inbox_response.data)
              if (inbox_response.data) {
                  this.setState({
                    inboxMessages: inbox_response.data,
                    showInboxMessage: true,
                    showSentMessage: false,
                    showImportantMessage: false
                  })
              }
         }

         if (email_selection == "sent") {
            if (sent_response.data) {
                this.setState({
                  sentMessages: sent_response.data,
                  showSentMessage: true,
                  showInboxMessage: false,
                  showImportantMessage: false
               })
            } 
         }

         if (email_selection == "important") {
           if (important_response.data) {
              this.setState({
                   importantMessages: important_response.data,
                   showSentMessage: false,
                   showInboxMessage: false,
                   showImportantMessage: true

              })
           }
           console.log(important_response.data)
         }

         if (email_selection == "readEachEmail") {

           // alert(message_id)
            console.log(message_id)
            indivisual_message = await axios.get('/message/getIndividualMessage/' + message_id + '/' + this.props.auth.user.email)
            console.log(indivisual_message.data)
            if (indivisual_message.data) {
                  this.setState({
                      showSentMessage: false,
                      showInboxMessage: false,
                      showIndividualMessage: true,
                      subject: indivisual_message.data.subject,
                      message: indivisual_message.data.message,
                      sender_name: indivisual_message.data.sender_name,
                      sender_email: indivisual_message.data.sender_email,
                      receiver_email: indivisual_message.data.receiver_email,
                      receiver_name: indivisual_message.data.receiver_name,
                      time: indivisual_message.data.time,
                      replies: indivisual_message.data.replies
                  })
             }

         }

         
    }

    render() {
      console.log(this.props)
        return (
            <div>
            <RegularBanner />
            <ComposeModal 
                 isOpen={this.state.modalIsOpen}
                 onAfterOpen={this.afterOpenModal}
                 onRequestClose={this.closeModal}
                 contentLabel="Example Modal"
            >
            </ComposeModal>
            <div className="container">
        <link rel="stylesheet prefetch" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" />
        <div className="mail-box">
          <aside className="sm-side">
            <div className="user-head">
              <a className="inbox-avatar" href="javascript:;">
                <img width={64} height={60} src={`/images/${this.props.match.params.email}.jpg`} />
              </a>
              <div className="user-name">
                <h5><a href="#">{this.props.auth.user.name}</a></h5>
                <span><a href="#">{this.props.auth.user.email}</a></span>
              </div>
              <a className="mail-dropdown pull-right" href="javascript:;">
                <i className="fa fa-chevron-down" />
              </a>
            </div>
            <div className="inbox-body">
              <a href="#myModal" data-toggle="modal" title="Compose" className="btn btn-compose" onClick = {this.openModal}>
                Compose
              </a>
              {/* Modal */}
              <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabIndex={-1} id="myModal" className="modal fade" style={{display: 'none'}}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                      <h4 className="modal-title">Compose</h4>
                    </div>
                    <div className="modal-body">
                      <form role="form" className="form-horizontal">
                        <div className="form-group">
                          <label className="col-lg-2 control-label">To</label>
                          <div className="col-lg-10">
                            <input type="text" placeholder id="inputEmail1" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-lg-2 control-label">Cc / Bcc</label>
                          <div className="col-lg-10">
                            <input type="text" placeholder id="cc" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-lg-2 control-label">Subject</label>
                          <div className="col-lg-10">
                            <input type="text" placeholder id="inputPassword1" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-lg-2 control-label">Message</label>
                          <div className="col-lg-10">
                            <textarea rows={10} cols={30} className="form-control" id name defaultValue={""} />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-2 col-lg-10">
                            <span className="btn green fileinput-button">
                              <i className="fa fa-plus fa fa-white" />
                              <span>Attachment</span>
                              <input type="file" name="files[]" multiple />
                            </span>
                            <button className="btn btn-send" type="submit">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>{/* /.modal-content */}
                </div>{/* /.modal-dialog */}
              </div>{/* /.modal */}
            </div>
            <ul className="inbox-nav inbox-divider">
              <li className={this.state.showInboxMessage ? "active" : ''}>
                <Link to= {{
                      pathname: "/inbox/" + this.props.auth.user.email,
                      search: "?emailType=inbox"
                 }}>
                    <i className="fa fa-inbox" /> Inbox 
                    
                      {this.state.showInboxMessage || this.state.showSentMessage ? 
                        <span className = "count_messages">
                            {inbox_response.data.length}
                           </span>
                          : null }
                           
                  
                </Link>
              </li>
              <li className={this.state.showSentMessage ? "active" : ''}>

                <Link to = {{
                   pathname: "/inbox/" + this.props.auth.user.email,
                   search: "?emailType=sent"
                }}>
                     <i className="fa fa-envelope-o" /> Sent Mail

                     {this.state.showInboxMessage || this.state.showSentMessage ? 
                        <span className = "count_messages">
                            {sent_response.data.length}
                           </span>
                          : null }
                </Link>

              </li>
              <li>

                 <Link to={{
                     pathname: "/inbox/" + this.props.auth.user.email,
                     search: "?emailType=important"
                 }}>
                     <i className="fa fa-bookmark-o" /> Important
                     
                </Link>

              </li>
              <li>
                <a href="#"><i className=" fa fa-external-link" /> Drafts <span className="label label-info pull-right">30</span></a>
              </li>
              <li>
                <a href="#"><i className=" fa fa-trash-o" /> Trash</a>
              </li>
            </ul>
           
            
           
          </aside>
          <aside className="lg-side">
            <div className="inbox-head">
              <h3>Inbox</h3>
              <form action="#" className="pull-right position">
                <div className="input-append">
                  <input type="text" className="sr-input" placeholder="Search Mail" />
                  <button className="btn sr-btn" type="button"><i className="fa fa-search" /></button>
                </div>
              </form>
            </div>
            <div className="inbox-body">






            


            {this.state.showInboxMessage ? 
              <Messages messages = {this.state.inboxMessages} history = {this.props.history} />
              : null }
            {this.state.showSentMessage ? 
             <Messages messages = {this.state.sentMessages} history = {this.props.history}/>
             : null }

           {this.state.showImportantMessage ? 
             <Messages messages = {this.state.importantMessages} history = {this.props.history} />
             : null }

             {this.state.showIndividualMessage ?
               <div>
                   <div>
                       <span className = "individual_message_label">Subject: </span>
                       <span>{this.state.subject}</span>
                  </div>
                   <div>
                          <span className = "individual_message_label">From: </span>
                          <span>{this.state.sender_name}</span>
                          <span>{`  <${this.state.sender_email}>`}</span>
                   </div>
                   <div>
                       <span className = "individual_message_label">To: </span>
                       <span>{this.state.receiver_name}</span>
                     
                      <span>{`  <${this.state.receiver_email}>`}</span>
                        

                   </div>
                   <div className = "space">

                  </div>
                   <div>
                          {this.state.message.split("\n").map((i,key) => {
                                  return <div key={key}>{i}</div>;
                            })}


                  </div>

              </div>
              : null }
             
             








             
              
            </div>
          </aside>
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

export default connect(mapStateToProps)(Inbox)