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
import Pagination from '../pagination/Pagination'

var inbox_response
var sent_response
var important_response
var drafted_message
var trash_response
var email_selection

Modal.setAppElement('#root')

class Inbox extends Component {

    constructor() {
        super()
        this.state = {
              message_id: '',
              trashed_message_ids: [],
              inboxMessages: [],
              sentMessages: [],
              importantMessages: [],
              draftedMessages: [],
              trashMessages: [],
              isDraft: [],
              showInboxMessage: false,
              showSentMessage: false,
              showImportantMessage: false,
              showIndividualMessage: false,
              showDraftedMessage: false,
              showTrashMessage: false,
              subject: '',
              message: '',
              sender_name: '',
              sender_email: '',
              receiver_email: '',
              time: '',
              replies: [],
              subreplies: [],
              currentPage: null, 
              totalPages: null ,
              modalIsOpen: false,
              replyModalIsOpen: false,
              isEdit: false,
              isReply: false,
              page_number: 0,
              total_messages: 0,
              page_size: 0,
              page_limit: 1
             
        }
    }

    increasePage = (page_number, items_per_page, total_items) => {
    alert(total_items / items_per_page)
    if (total_items / items_per_page > page_number + 1)
       this.setState({
          page_number: page_number + 1
       })
    }

    decreasePage = (page_number) => {
      this.setState({
         page_number: page_number + 1
      })
   }

    onPageChanged = data => {
       
      console.log(data)
      const { replies }  = this.state;
      const { currentPage, totalPages, pageLimit } = data;
  
      const offset = (currentPage - 1) * pageLimit;
      const subreplies = replies.reverse().slice(offset, offset + pageLimit);
  
      this.setState({ currentPage, subreplies, totalPages });
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

    openModal = (isEdit, isReply) => {
      this.setState({
        modalIsOpen: true,
        isEdit: isEdit,
        isReply: isReply
      });
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
         
         var message_id
         var indivisual_message
         var page_number
       
         console.log(values)
         console.log(values["emailType"])
 
     
         for (var key in values) {
           
           if (key === "emailType") {
              email_selection = values[key]
           }
           if (key === "message_id") {
              
               message_id = values[key]
           }

            // if (key === "page") {
            //   page_number = values[key]
            //   this.setState({
            //     page_number: parseInt(values[key])
            //   })
            //   alert(this.state.page_number)
            // }
         }

        
        
   
         inbox_response = await axios.get('/message/getInboxMessages/' + this.props.match.params.email + "/" + this.props.match.params.page)
         sent_response = await axios.get('/message/getSentMessages/' + this.props.match.params.email + "/" + this.props.match.params.page)
         important_response = await axios.get('/message/getStarredMessages/' + this.props.match.params.email + "/" + this.props.match.params.page)
         drafted_message = await axios.get('/message/getDraftedMessages/' + this.props.auth.user.email + "/" + this.props.match.params.page)
         trash_response = await axios.get('/message/getTrashedMessages/' + this.props.match.params.email + "/" + this.props.match.params.page)

         if (email_selection == "inbox" || email_selection == undefined) {
           console.log(inbox_response.data)
              if (inbox_response.data) {
                  this.setState({
                    inboxMessages: inbox_response.data.messages,
                    total_messages: inbox_response.data.total,
                    page_size: inbox_response.data.pageSize,
                    page_limit: inbox_response.data.limit,
                    showInboxMessage: true,
                    showSentMessage: false,
                    showImportantMessage: false,
                    showTrashMessage: false
                  })
              }
         }

         if (email_selection == "sent") {
            if (sent_response.data) {
                this.setState({
                  sentMessages: sent_response.data.messages,
                  total_messages: sent_response.data.total,
                  page_size: sent_response.data.pageSize,
                  page_limit: sent_response.data.limit,
                  showSentMessage: true,
                  showInboxMessage: false,
                  showImportantMessage: false,
                  showTrashMessage: false
               })
            } 
         }

         if (email_selection == "important") {
           if (important_response.data) {
              this.setState({
                   importantMessages: important_response.data.messages,
                   total_messages: important_response.data.total,
                   page_size: important_response.data.pageSize,
                   page_limit: important_response.data.limit,
                   showSentMessage: false,
                   showInboxMessage: false,
                   showImportantMessage: true,
                   showTrashMessage: false

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
                      showTrashMessage: false,
                      message_id: indivisual_message.data.message_id,
                      subject: indivisual_message.data.subject,
                      message: indivisual_message.data.message,
                      sender_name: indivisual_message.data.sender_name,
                      sender_email: indivisual_message.data.sender_email,
                      receiver_email: indivisual_message.data.receiver_email,
                      receiver_name: indivisual_message.data.receiver_name,
                      time: indivisual_message.data.time,
                      replies: indivisual_message.data.replies,
                      isDraft: indivisual_message.data.isDraft,
                      sentMessages: sent_response.data,
                      importantMessages: important_response.data
                     
                  })
             }

         }


         if (email_selection == "draft") {
              //drafted_message = await axios.get('/message/getDraftedMessages/' + this.props.auth.user.email)
              console.log(drafted_message.data)
              if (drafted_message.data) {
                      this.setState({
                        draftedMessages: drafted_message.data.messages,
                        total_messages: drafted_message.data.total,
                        page_size: drafted_message.data.pageSize,
                        page_limit: drafted_message.data.limit,
                        showSentMessage: false,
                        showInboxMessage: false,
                        showImportantMessage: false,
                        showDraftedMessage: true,
                        showTrashMessage: false

                    })
                  }
         }

         if (email_selection == "trash") {
             if (trash_response.data) {
               console.log(trash_response)
               this.setState({
                  trashMessages: trash_response.data.messages,
                  total_messages: trash_response.data.total,
                  page_size: trash_response.data.pageSize,
                  page_limit: trash_response.data.limit,
                  showSentMessage: false,
                  showInboxMessage: false,
                  showImportantMessage: false,
                  showDraftedMessage: false,
                  showTrashMessage: true
               })
             }
         }

         
    }

    render() {


      const { replies, subreplies, currentPage, totalPages } = this.state;
      const totalReplies = replies.length;

      console.log(this.props)
        return (
            <div>
            <RegularBanner />
            {this.state.showInboxMessage || this.state.showSentMessage || this.state.showImportantMessage 
                      || this.state.showIndividualMessage  || this.state.showDraftedMessage 
                      || this.state.showTrashMessage ?
                <ComposeModal 
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    isDraft = {this.state.isDraft}
                    receiver_email = {this.state.receiver_email}
                    sender_email = {this.state.sender_email}
                    subject = {this.state.subject}
                    message = {this.state.message}
                    isEdit = {this.state.isEdit}
                    isReply = {this.state.isReply}
                    message_id = {this.state.message_id}
                >
                </ComposeModal>
                : null }
                
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
              <a href="#myModal" data-toggle="modal" title="Compose" className="btn btn-compose" onClick = {() => this.openModal(false, false)}>
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
                      pathname: "/inbox/" + this.props.auth.user.email + '/0',
                      search: "?emailType=inbox"
                 }}>
                    <i className="fa fa-inbox" /> Inbox 
                    
                      {this.state.showInboxMessage || this.state.showSentMessage || this.state.showImportantMessage 
                      || this.state.showIndividualMessage  || this.state.showDraftedMessage 
                      || this.state.showTrashMessage ? 
                        <span className = "count_messages">
                            {inbox_response.data.total}
                           </span>
                          : null }
                           
                  
                </Link>
              </li>
              <li className={this.state.showSentMessage ? "active" : ''}>

                <Link to = {{
                   pathname: "/inbox/" + this.props.auth.user.email + '/0',
                   search: "?emailType=sent"
                }}>
                     <i className="fa fa-envelope-o" /> Sent Mail

                     {this.state.showInboxMessage || this.state.showSentMessage || this.state.showImportantMessage
                       || this.state.showIndividualMessage || this.state.showDraftedMessage 
                       || this.state.showTrashMessage ? 
                        <span className = "count_messages">
                            {sent_response.data.total}
                           </span>
                          : null }
                </Link>

              </li>
              <li className={this.state.showImportantMessage ? "active" : ''}>

                 <Link to={{
                     pathname: "/inbox/" + this.props.auth.user.email + '/0',
                     search: "?emailType=important"
                 }}>
                     <i className="fa fa-bookmark-o" /> Important

                     {this.state.showInboxMessage || this.state.showSentMessage || this.state.showImportantMessage
                       || this.state.showIndividualMessage || this.state.showDraftedMessage 
                       || this.state.showTrashMessage ? 
                        <span className = "count_messages">
                            {important_response.data.total}
                           </span>
                          : null }
                     
                </Link>

              </li>
              <li className={this.state.showDraftedMessage ? "active" : ''}>
                <Link to = {{
                     pathname: "/inbox/" + this.props.auth.user.email + '/0',
                     search: "?emailType=draft"
                }}>
                    <i className=" fa fa-external-link" /> Drafts 
                       
                       {this.state.showInboxMessage || this.state.showSentMessage || this.state.showImportantMessage
                       || this.state.showIndividualMessage || this.state.showDraftedMessage 
                       || this.state.showTrashMessage ? 
                        <span className = "count_messages">
                            {drafted_message.data.total}
                           </span>
                          : null }
                         
                       
                </Link>
              </li>
              <li className={this.state.showTrashMessage ? "active" : ''}>

                <Link to={{
                     pathname: "/inbox/" + this.props.auth.user.email + '/0',
                     search: "?emailType=trash"
                }}>
                      <i className=" fa fa-trash-o" /> Trash
                      {this.state.showInboxMessage || this.state.showSentMessage || this.state.showImportantMessage
                       || this.state.showIndividualMessage || this.state.showDraftedMessage 
                       || this.state.showTrashMessage ? 
                        <span className = "count_messages">
                            {trash_response.data.total}
                           </span>
                          : null }
                </Link>

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
              <Messages messages = {this.state.inboxMessages} 
                        history = {this.props.history} 
                        page_number = {this.props.match.params.page}
                        total_messages = {this.state.total_messages}
                        page_size = {this.state.page_size}
                        page_limit = {this.state.page_limit}
                        emailType = 'inbox'
                        />
              : null }

            {this.state.showSentMessage ? 
             <Messages messages = {this.state.sentMessages} 
                       history = {this.props.history}
                       page_number = {this.props.match.params.page}
                       total_messages = {this.state.total_messages}
                       page_size = {this.state.page_size}
                       page_limit = {this.state.page_limit} 
                       emailType = 'sent' 
                       />
             : null }

           {this.state.showImportantMessage ? 
             <Messages messages = {this.state.importantMessages} 
                       history = {this.props.history} 
                       page_number = {this.props.match.params.page}
                       total_messages = {this.state.total_messages}
                       page_size = {this.state.page_size}
                       page_limit = {this.state.page_limit}  
                       emailType = 'important' 
                       />
             : null }

       {this.state.showDraftedMessage ? 
             <Messages messages = {this.state.draftedMessages} 
                       history = {this.props.history} 
                       page_number = {this.props.match.params.page}
                       total_messages = {this.state.total_messages}
                       page_size = {this.state.page_size}
                       page_limit = {this.state.page_limit}  
                       emailType = 'draft' 
                       
                       />
             : null }

      {this.state.showTrashMessage ? 
             <Messages messages = {this.state.trashMessages} 
                       history = {this.props.history} 
                       page_number = {this.props.match.params.page}
                       total_messages = {this.state.total_messages}
                       page_size = {this.state.page_size}
                       page_limit = {this.state.page_limit}  
                       emailType = 'trash' 
                       
                       />
             : null }



             {this.state.showIndividualMessage ?
               <div>
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
                                {this.state.isDraft.some(e => e.email === this.props.auth.user.email) ?
                                  null

                                    : 
                                    <div className = "floatRight">
                                      <button className="ui primary button" onClick = {() => this.openModal(false, true)}>
                                      <i className="fa fa-mail-reply" />
                                    </button>
                                    </div>
                                    
                                    }


                                  

                            </div>
                            <div>
                                    <span className = "individual_message_label">Time: </span>
                                    <Moment format="HH:mm MM/DD/YYYY">{this.state.time}</Moment>
                                 
                            </div>
                            <div className = "space">

                            </div>
                            <div>
                                    {this.state.message.split("\n").map((i,key) => {
                                            return <div key={key}>{i}</div>;
                                      })}


                            </div>
                          
                            <div className = "space">

                            </div>

                            {this.state.isDraft.some(e => e.email === this.props.auth.user.email) ?

                                    <button className="ui primary button" type="submit" onClick = {() => this.openModal(true, false)}>Edit</button>
                                    : null }

                        </div>
                        <div>
                          {this.state.subreplies.map(reply => 
                          <div className = "well">
                            <Card.Header>
                              <div>
                                    <span className = "individual_message_label">From: </span>
                                    <span>{reply.name}</span>
                                    <span>{`  <${reply.email}>`}</span>
                              </div>
                              <div>
                                    <span className = "individual_message_label">Time: </span>
                                 
                                    <Moment format="HH:mm MM/DD/YYYY">{reply.time}</Moment> 
                                  
                              </div>
                              <div className = "space">

                              </div>
                              <div>
                                 {reply.message}

                              </div>
                            
                            </Card.Header>
                            <div className = "space"> 
                            </div>
                            </div>
                          )}

                        </div>
                        <Pagination totalRecords={ totalReplies } pageLimit={2} pageNeighbours={1} onPageChanged={this.onPageChanged} />

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