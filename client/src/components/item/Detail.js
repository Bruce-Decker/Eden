import React, { Component } from 'react';
import './Item.css';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import axios from 'axios';

import CartAddButton from '../cart/CartAddButton';
import Add from './Add';
import Try from './Try';
import apple from '../../images/apple.png';
import star from '../../images/rating.png';
import appliances from '../../images/appliances.png';
import arts from '../../images/arts.png';
import books from '../../images/books.png';
import clothing from '../../images/clothing.png';
import computers from '../../images/computers.png';
import electronics from '../../images/electronics.png';
import games from '../../images/games.png';
import home from '../../images/home.png';
import clothingJpg from '../../images/clothing.jpg';

class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: null,
      new_bid: -1,
      showItem: false,
      comments: ''

    };

    this.getMaxBid = this.getMaxBid.bind(this);
    this.getBidVisibility = this.getBidVisibility.bind(this);
    this.handleClickBid = this.handleClickBid.bind(this);
    this.handleNewBid = this.handleNewBid.bind(this);
    this.testBids = this.testBids.bind(this);
  }

  async componentWillMount() {
    const response = await axios.get('/items/' + this.props.id)
    console.log(response)
    if (response.data[0]) {
        this.setState({
          item: response.data[0],
          showItem: true,
          comments: response.data[0].comments

        })
    }
   
  }

  getBidVisibility() {
    // no bid price means that bidding is not supported for this item
    if (!('bid_price' in this.state.item) || this.state.item.bid_price == null) {
      return 'item-bids-hide';
    } else {
      return 'item-bids-show';
    }
  }

  getMaxBid() {
    if(this.state.item.bid_price && this.state.item.bid_price != null) {
      let bids = this.state.item.bids;
      let eml = '';
      let amt = -1;
      let email_class = '';

      if(bids.length === 0) {
        eml = 'Starting Bid'
        amt = this.state.item.bid_price.toFixed(2);
        email_class = 'bid-max-email-yours';
      } else {

        // get the object containing the max bid
        let maxo = bids.reduce(function(prev, curr) {
          return (prev.amount > curr.amount) ? prev : curr
        });

        let email = this.props.auth.user.email;
        if(email === maxo.email) {
          email_class = 'bid-max-email-mine';
        } else {
          email_class = 'bid-max-email-yours';
        }

        eml = maxo.email;
        amt = maxo.amount.toFixed(2);
      }

      return (
        <span>
          <span className="bid-max-amount">
            {amt}
          </span>
          <span>
            &nbsp;--&nbsp;
          </span>
          <span className={email_class}>
            {eml}
          </span>
        </span>
      );
    } else {
      return 0.00;
    }
  }

  handleClickBid() {
    let bid = parseFloat(this.state.new_bid);
    let email = this.props.auth.user.email;
    
    let maxo = null;
    if(this.state.item.bids.length === 0) {
      maxo = {
        email: email,
        amount: this.state.item.bid_price
      }
    } else {
      // get the object containing the max bid
      maxo = this.state.item.bids.reduce(function(prev, curr) {
        return (prev.amount > curr.amount) ? prev : curr
      });
    }

    if(email === this.state.item.email) {
      toast.error("You cannot bid on your own item!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        newestOnTop: true,
        className: "addtocart-toast-toast",
        bodyClassName: "addtocart-toast-body",
        progressClassName: "addtocart-toast-progress",
        draggable: false,
      });
    } else if(email === maxo.email) {
      toast.error("You already have the highest bid!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        newestOnTop: true,
        className: "addtocart-toast-toast",
        bodyClassName: "addtocart-toast-body",
        progressClassName: "addtocart-toast-progress",
        draggable: false,
      });
    } else if(bid <= maxo.amount) {
      toast.error("Bid must be higher than the previous bid!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        newestOnTop: true,
        className: "addtocart-toast-toast",
        bodyClassName: "addtocart-toast-body",
        progressClassName: "addtocart-toast-progress",
        draggable: false,
      });
    } else {
      toast.success("Bid successfully placed!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        newestOnTop: true,
        className: "addtocart-toast-toast",
        bodyClassName: "addtocart-toast-body",
        progressClassName: "addtocart-toast-progress",
        draggable: false,
      });

      let dt = new Date();
      let dtISO = dt.toISOString();

      let new_bid_client = {
        email: email,
        amount: bid,
        time: dtISO
      }

      // update the page elements by changing the component state
      this.setState({
        item: {
          ...this.state.item,
          bids: [
            ...this.state.item.bids,
            new_bid_client
          ]
        }
      });

      // actually persist the bid in the backend
      let new_bid_server = {
        email: email,
        amount: bid,
        iid: this.state.item.item_id
      }

      axios
        .post('/bids/makeBid', new_bid_server)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleNewBid(e) {
    let val1 = parseFloat(e.target.value);
    let val2 = val1.toFixed(2);
    this.setState({
      new_bid: val2
    })
  }

  testBids(e) {
    /*
    var copy = JSON.parse(JSON.stringify(this.state.item.bids));
    copy.pop();
    this.setState({
      item: {
        ...this.state.item,
        bids: copy
      }
    });
    */
    console.log(this.state);
  }

  render() {
    if (this.state.item != null) {
      const item = this.state.item
      return (
        <div className="container-item">
          <div className="row">
          <div className="col-1"/>
          <div className="col-6 align-items-center item-img" style={{paddingLeft: "8vw", paddingRight: "8vw"}}>
           {this.state.showItem ?
            <img
              key={item.item_id}
              className="item-detail-img"
              src={item.item_image}
              alt="Item Image"
            />    
            :  <img
            key={item.item_id}
            className="item-detail-img"
            src={getImage(item.category)}
            alt="Item Image"
          />     }
          </div>
          <div className="col-3" >
            <div className="item-title">
              {item.item_name}
              <span style={{marginLeft: "1rem"}}></span>
              <Try id={item.item_id} ar={item.ar}></Try>
            </div>
            <div className="item-by">{item.category}</div>
            <div className="item-desc"><Link to  = {`/vr/${item.item_id}`} target="_blank">Try VR</Link></div>
            <div className="item-desc">{item.description}</div>
            <div>
              {Array.from(Array(item.average_rating), (e, i) => {
                return <img key={i} src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
              })}
            </div>
            <div className="item-price">${item.price.toFixed(2)}</div>
            <div>
              <CartAddButton item={this.state.item} cls={"addtocart-btn-sm"}/>
              <span style={{marginLeft: "1rem"}}></span>
            </div>
            <hr/>
            <div className={this.getBidVisibility()}>
              <div>
                Current bid: ${this.getMaxBid()}
              </div>
              <div>
                <button className="make-bid-btn" onClick={this.handleClickBid}>Make a Bid</button>
                <span className="make-bid-dlr">$</span>
                <input type="text" class="make-bid-txt" onChange={this.handleNewBid}></input>
              </div>
              <hr/>
            </div>
            <button className="test-bids-btn" onClick={this.testBids}>TEST</button>
          </div>
          </div>
          <div className="col-1"/>
        </div>
      );
    } else {
      return null;
    }
  }  
 
}

function getImage(category) {
  switch (category) {
    case "appliances":
      return appliances
    case "arts":
      return arts
    case "books":
      return books
    case "computers":
      return computers
    case "clothing":
      return clothing
    case "electronics":
      return electronics
    case "games":
      return games
    case "home":
      return home
    default:
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(
  mapStateToProps
)(Detail);


















