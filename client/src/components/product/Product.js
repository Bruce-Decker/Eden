import React, { Component } from 'react';
import './Product.css';
import { connect } from 'react-redux';
import RegularBanner from '../banner/RegularBanner';
import Category from './Category';
import Scroller from './Scroller';
import axios from 'axios';
import Modal from 'react-modal';
import { BrowserRouter as Route, Link } from 'react-router-dom';

const categories = ['Appliances', 'Arts', 'Books', 'Clothing', 'Computers', 'Electronics', 'Games', 'Home']

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: "400px",
    height: "500px",
    backgroundColor: 'rgba(0,0,0,.6)'
  }
};


Modal.setAppElement("#root");

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rfy: [],
      bsl: [],
      dls: [],
      showUserRecs: false,
      showTopRatedItems: false,
      showTodaysDeals: false,
      modalIsOpen: false
      
    };
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


  

  componentWillMount() {
    let email = this.props.auth.user.email;
    let params = {
      email: 'hoxodo@atech5.com'
    }
    
    axios
      .post('/recs/getUserRecs', params)
      .then(res => {
        console.log(res);
        this.setState({
          rfy: res.data,
          showUserRecs: true
        })
      })
      .catch(err =>
        console.log(err)
      );

    axios
      .get('/recs/getTopRatedItems')
      .then(res => {
        console.log(res);
        this.setState({
          bsl: res.data,
          showTopRatedItems: true
        })
      })
      .catch(err =>
        console.log(err)
      );

    axios
      .get('/recs/getTodaysDeals')
      .then(res => {
        console.log(res);
        this.setState({
          dls: res.data,
          showTodaysDeals: true
        })
      })
      .catch(err =>
        console.log(err)
      );
  }


  render() {
    return (
      <div>
        <RegularBanner />
        
        <div>
          {this.state.showUserRecs ? 
              <Scroller header="Recommended for you" data={this.state.rfy} keyPrefix={"rfy"}/>
              : null }
          {this.state.showTopRatedItems ? 
             <Scroller header="Bestsellers" data={this.state.bsl} keyPrefix={"bsl"}/>
             : null }
          {this.state.showTodaysDeals ? 
             <Scroller header="Today's deals" data={this.state.dls} keyPrefix={"dls"}/>
             : null }
          </div>
         
          <div className="product-container">
          
            <div className="product-header">
            <div className="btn-chat" id="livechat-compact-container" style={{visibility: "visible", opacity: "1"}}>
	<div className="btn-holder">
		<a onClick={() => this.openModal()} href="#" class="link">Chatbot</a>
	</div>
</div>
<Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

<iframe
    allow="microphone;"
    width="350"
    height="430"
    src="https://console.dialogflow.com/api-client/demo/embedded/8d649ded-c666-4e29-90da-a32e7cd37712">
</iframe>
        </Modal>


              Categories
              </div>
            <div className="row" style={{marginLeft: "0.6rem", marginRight: "0.2rem"}}>
              {/* {Array.from(Array(6), (e, i) => {
                return  <Category key={i} name={categories[i]}/>
              })} */}
               {categories.map(category => {
                  return  <Category name={category}/>
               })}
            </div>
           
          </div>
        </div>
     
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(
  mapStateToProps
)(Product);






























