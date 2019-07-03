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

class Inbox extends Component {

    constructor() {
        super()
        this.state = {
              messages: [],
              showMessage: false
        }
    }


    async componentWillReceiveProps(nextProps) {
      if (nextProps.location.search !== this.props.location.search) {    
           window.location.reload();
      }

    }


    async componentDidMount() {
         var values = queryString.parse(this.props.location.search);
         var email_selection
         var response
         for (var key in values) {
            email_selection = values[key]
         }
   
         
        
         if (email_selection == "inbox" || email_selection == undefined) {
            response = await axios.get('/message/getInboxMessages/' + this.props.match.params.email)
            this.setState({
               messages: response.data,
               showMessage: true
            })
            console.log(response)
            console.log(this.state.messages)
         } 
         if (email_selection == "sent") {
            
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
              <li className="active">
                <Link to= {{
                      pathname: "/inbox/" + this.props.auth.user.email,
                      search: "?emailType=inbox"
                 }}>
                    <i className="fa fa-inbox" /> Inbox <span className="label label-danger pull-right">2</span>
                </Link>
              </li>
              <li>

                <Link to = {{
                   pathname: "/inbox/" + this.props.auth.user.email,
                   search: "?emailType=sent"
                }}>
                     <i className="fa fa-envelope-o" /> Sent Mail
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
             
              <div className="div-inbox">
              
                    {this.state.messages.map(message => 
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
                                            
                                             <Moment format="HH:mm YYYY/MM/DD">{message.time}</Moment> 
                                             
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
                                            
                                             <Moment format="HH:mm YYYY/MM/DD">{message.time}</Moment> 
                                             
                                          </h3>
                                       </div>

                                </div>
                            
                            
                             }
                            
                           
                        </div>    
                         </Card>
                    )}
                 
              </div>
             
              <table className="table table-inbox table-hover">
                <tbody>
               
               
                        {/* {this.state.messages.map(message => 
                           <tr className="unread">
                            { message.isRead ? 
                             
                             <tr className="unread">
                             <td className="inbox-small-cells">
                               <input type="checkbox" className="mail-checkbox" />
                             </td>
                             <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                             <td className="view-message  dont-show">PHPClass</td>
                             <td className="view-message ">Added a new class: Login Class Fast Site</td>
                             <td className="view-message  inbox-small-cells"><i className="fa fa-paperclip" /></td>
                             <td className="view-message  text-right">9:27 AM</td>
                           </tr>
                            
                              :
                              <tr className="unread">
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message  dont-show">PHPClass</td>
                    <td className="view-message ">Added a new class: Login Class Fast Site</td>
                    <td className="view-message  inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message  text-right">9:27 AM</td>
                  </tr>
                                      
                           
                            }
                            </tr>
                        )} */}
                       
                  
                  {/* <tr className="unread">
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message  dont-show">PHPClass</td>
                    <td className="view-message ">Added a new class: Login Class Fast Site</td>
                    <td className="view-message  inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message  text-right">9:27 AM</td>
                  </tr>
                 
                  <tr className="unread">
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Google Webmaster </td>
                    <td className="view-message">Improve the search presence of WebSite</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">March 15</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">JW Player</td>
                    <td className="view-message">Last Chance: Upgrade to Pro for </td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">March 15</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Tim Reid, S P N</td>
                    <td className="view-message">Boost Your Website Traffic</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">April 01</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star inbox-started" /></td>
                    <td className="view-message dont-show">Freelancer.com <span className="label label-danger pull-right">urgent</span></td>
                    <td className="view-message">Stop wasting your visitors </td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">May 23</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star inbox-started" /></td>
                    <td className="view-message dont-show">WOW Slider </td>
                    <td className="view-message">New WOW Slider v7.8 - 67% off</td>
                    <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message text-right">March 14</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star inbox-started" /></td>
                    <td className="view-message dont-show">LinkedIn Pulse</td>
                    <td className="view-message">The One Sign Your Co-Worker Will Stab</td>
                    <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message text-right">Feb 19</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Drupal Community<span className="label label-success pull-right">megazine</span></td>
                    <td className="view-message view-message">Welcome to the Drupal Community</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">March 04</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Facebook</td>
                    <td className="view-message view-message">Somebody requested a new password </td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">June 13</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Skype <span className="label label-info pull-right">family</span></td>
                    <td className="view-message view-message">Password successfully changed</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">March 24</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star inbox-started" /></td>
                    <td className="view-message dont-show">Google+</td>
                    <td className="view-message">alireza, do you know</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">March 09</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star inbox-started" /></td>
                    <td className="dont-show">Zoosk </td>
                    <td className="view-message">7 new singles we think you'll like</td>
                    <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message text-right">May 14</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">LinkedIn </td>
                    <td className="view-message">Alireza: Nokia Networks, System Group and </td>
                    <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message text-right">February 25</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="dont-show">Facebook</td>
                    <td className="view-message view-message">Your account was recently logged into</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">March 14</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Twitter</td>
                    <td className="view-message">Your Twitter password has been changed</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">April 07</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">InternetSeer Website Monitoring</td>
                    <td className="view-message">http://golddesigner.org/ Performance Report</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">July 14</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star inbox-started" /></td>
                    <td className="view-message dont-show">AddMe.com</td>
                    <td className="view-message">Submit Your Website to the AddMe Business Directory</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">August 10</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Terri Rexer, S P N</td>
                    <td className="view-message view-message">Forget Google AdWords: Un-Limited Clicks fo</td>
                    <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message text-right">April 14</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Bertina </td>
                    <td className="view-message">IMPORTANT: Don't lose your domains!</td>
                    <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message text-right">June 16</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star inbox-started" /></td>
                    <td className="view-message dont-show">Laura Gaffin, S P N </td>
                    <td className="view-message">Your Website On Google (Higher Rankings Are Better)</td>
                    <td className="view-message inbox-small-cells" />
                    <td className="view-message text-right">August 10</td>
                  </tr>
                  <tr className>
                    <td className="inbox-small-cells">
                      <input type="checkbox" className="mail-checkbox" />
                    </td>
                    <td className="inbox-small-cells"><i className="fa fa-star" /></td>
                    <td className="view-message dont-show">Facebook</td>
                    <td className="view-message view-message">Alireza Zare Login faild</td>
                    <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                    <td className="view-message text-right">feb 14</td>
                  </tr> */}
                </tbody>
              </table>
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