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

var inbox_response
var sent_response
class Inbox extends Component {

    constructor() {
        super()
        this.state = {
              inboxMessages: [],
              sentMessages: [],
              showInboxMessage: false,
              showSentMessage: false
        }
    }

    starMessage = (message_id) => {
          
    }


    async componentWillReceiveProps(nextProps) {
      if (nextProps.location.search !== this.props.location.search) {    
           window.location.reload();
      }

    }


    async componentDidMount() {
         var values = queryString.parse(this.props.location.search);
         var email_selection

       
         for (var key in values) {
            email_selection = values[key]
         }
   
         inbox_response = await axios.get('/message/getInboxMessages/' + this.props.match.params.email)
         sent_response = await axios.get('/message/getSentMessages/' + this.props.match.params.email)
        
         if (email_selection == "inbox" || email_selection == undefined) {
              this.setState({
                inboxMessages: inbox_response.data,
                showInboxMessage: true,
                showSentMessage: false
              })
         }

         if (email_selection == "sent") {
              this.setState({
                sentMessages: sent_response.data,
                showSentMessage: true,
                showInboxMessage: false
            })
         }

         
    }

    render() {
        return (
            <div>
            <RegularBanner />
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
              <a href="#myModal" data-toggle="modal" title="Compose" className="btn btn-compose">
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
                <a href="#"><i className="fa fa-bookmark-o" /> Important</a>
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
             


            {this.state.showInboxMessage ? 
              <Messages messages = {this.state.inboxMessages} />
              : null }
            {this.state.showSentMessage ? 
             <Messages messages = {this.state.sentMessages} />
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