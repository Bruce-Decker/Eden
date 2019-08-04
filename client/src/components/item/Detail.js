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
import red_blazer from '../../images/clothing/red_blazer.jpg';
import orange_blazer from '../../images/clothing/orange_blazer.jpg';
import yellow_blazer from '../../images/clothing/yellow_blazer.jpg';
import green_blazer from '../../images/clothing/green_blazer.jpg';
import blue_blazer from '../../images/clothing/blue_blazer.jpg';
import purple_blazer from '../../images/clothing/purple_blazer.jpg';
import pink_blazer from '../../images/clothing/pink_blazer.jpg';
import white_blazer from '../../images/clothing/white_blazer.jpg';
import black_blazer from '../../images/clothing/black_blazer.jpg';
import gray_blazer from '../../images/clothing/gray_blazer.jpg';
import red_sweater from '../../images/clothing/red_sweater.jpg';
import orange_sweater from '../../images/clothing/orange_sweater.jpg';
import yellow_sweater from '../../images/clothing/yellow_sweater.jpg';
import green_sweater from '../../images/clothing/green_sweater.jpg';
import blue_sweater from '../../images/clothing/blue_sweater.jpg';
import purple_sweater from '../../images/clothing/purple_sweater.jpg';
import pink_sweater from '../../images/clothing/pink_sweater.jpg';
import white_sweater from '../../images/clothing/white_sweater.jpg';
import black_sweater from '../../images/clothing/black_sweater.jpg';
import gray_sweater from '../../images/clothing/gray_sweater.jpg';
import red_jacket from '../../images/clothing/red_jacket.jpg';
import orange_jacket from '../../images/clothing/orange_jacket.jpg';
import yellow_jacket from '../../images/clothing/yellow_jacket.jpg';
import green_jacket from '../../images/clothing/green_jacket.jpg';
import blue_jacket from '../../images/clothing/blue_jacket.jpg';
import purple_jacket from '../../images/clothing/purple_jacket.jpg';
import pink_jacket from '../../images/clothing/pink_jacket.jpg';
import white_jacket from '../../images/clothing/white_jacket.jpg';
import black_jacket from '../../images/clothing/black_jacket.jpg';
import gray_jacket from '../../images/clothing/gray_jacket.jpg';
import red_hoodie from '../../images/clothing/red_hoodie.jpg';
import orange_hoodie from '../../images/clothing/orange_hoodie.jpg';
import yellow_hoodie from '../../images/clothing/yellow_hoodie.jpg';
import green_hoodie from '../../images/clothing/green_hoodie.jpg';
import blue_hoodie from '../../images/clothing/blue_hoodie.jpg';
import purple_hoodie from '../../images/clothing/purple_hoodie.jpg';
import pink_hoodie from '../../images/clothing/pink_hoodie.jpg';
import white_hoodie from '../../images/clothing/white_hoodie.jpg';
import black_hoodie from '../../images/clothing/black_hoodie.jpg';
import gray_hoodie from '../../images/clothing/gray_hoodie.jpg';
import red_pants from '../../images/clothing/red_pants.jpg';
import orange_pants from '../../images/clothing/orange_pants.jpg';
import yellow_pants from '../../images/clothing/yellow_pants.jpg';
import green_pants from '../../images/clothing/green_pants.jpg';
import blue_pants from '../../images/clothing/blue_pants.jpg';
import purple_pants from '../../images/clothing/purple_pants.jpg';
import pink_pants from '../../images/clothing/pink_pants.jpg';
import white_pants from '../../images/clothing/white_pants.jpg';
import black_pants from '../../images/clothing/black_pants.jpg';
import gray_pants from '../../images/clothing/gray_pants.jpg';
import red_shorts from '../../images/clothing/red_shorts.jpg';
import orange_shorts from '../../images/clothing/orange_shorts.jpg';
import yellow_shorts from '../../images/clothing/yellow_shorts.jpg';
import green_shorts from '../../images/clothing/green_shorts.jpg';
import blue_shorts from '../../images/clothing/blue_shorts.jpg';
import purple_shorts from '../../images/clothing/purple_shorts.jpg';
import pink_shorts from '../../images/clothing/pink_shorts.jpg';
import white_shorts from '../../images/clothing/white_shorts.jpg';
import black_shorts from '../../images/clothing/black_shorts.jpg';
import gray_shorts from '../../images/clothing/gray_shorts.jpg';
import red_sweatpants from '../../images/clothing/red_sweatpants.jpg';
import orange_sweatpants from '../../images/clothing/orange_sweatpants.jpg';
import yellow_sweatpants from '../../images/clothing/yellow_sweatpants.jpg';
import green_sweatpants from '../../images/clothing/green_sweatpants.jpg';
import blue_sweatpants from '../../images/clothing/blue_sweatpants.jpg';
import purple_sweatpants from '../../images/clothing/purple_sweatpants.jpg';
import pink_sweatpants from '../../images/clothing/pink_sweatpants.jpg';
import white_sweatpants from '../../images/clothing/white_sweatpants.jpg';
import black_sweatpants from '../../images/clothing/black_sweatpants.jpg';
import gray_sweatpants from '../../images/clothing/gray_sweatpants.jpg';
import red_cardigan from '../../images/clothing/red_cardigan.jpg';
import orange_cardigan from '../../images/clothing/orange_cardigan.jpg';
import yellow_cardigan from '../../images/clothing/yellow_cardigan.jpg';
import green_cardigan from '../../images/clothing/green_cardigan.jpg';
import blue_cardigan from '../../images/clothing/blue_cardigan.jpg';
import purple_cardigan from '../../images/clothing/purple_cardigan.jpg';
import pink_cardigan from '../../images/clothing/pink_cardigan.jpg';
import white_cardigan from '../../images/clothing/white_cardigan.jpg';
import black_cardigan from '../../images/clothing/black_cardigan.jpg';
import gray_cardigan from '../../images/clothing/gray_cardigan.jpg';
import red_vest from '../../images/clothing/red_vest.jpg';
import orange_vest from '../../images/clothing/orange_vest.jpg';
import yellow_vest from '../../images/clothing/yellow_vest.jpg';
import green_vest from '../../images/clothing/green_vest.jpg';
import blue_vest from '../../images/clothing/blue_vest.jpg';
import purple_vest from '../../images/clothing/purple_vest.jpg';
import pink_vest from '../../images/clothing/pink_vest.jpg';
import white_vest from '../../images/clothing/white_vest.jpg';
import black_vest from '../../images/clothing/black_vest.jpg';
import gray_vest from '../../images/clothing/gray_vest.jpg';
import red_jeans from '../../images/clothing/red_jeans.jpg';
import orange_jeans from '../../images/clothing/orange_jeans.jpg';
import yellow_jeans from '../../images/clothing/yellow_jeans.jpg';
import green_jeans from '../../images/clothing/green_jeans.jpg';
import blue_jeans from '../../images/clothing/blue_jeans.jpg';
import purple_jeans from '../../images/clothing/purple_jeans.jpg';
import pink_jeans from '../../images/clothing/pink_jeans.jpg';
import white_jeans from '../../images/clothing/white_jeans.jpg';
import black_jeans from '../../images/clothing/black_jeans.jpg';
import gray_jeans from '../../images/clothing/gray_jeans.jpg';

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
    // also do not allow bidding if no user is logged in
    if (!('bid_price' in this.state.item) || this.state.item.bid_price == null
       || !this.props.auth || !this.props.auth.user || !this.props.auth.user.email) {
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
          <div className="col-6 align-items-center item-img" style={{paddingLeft: "8vw", paddingRight: "8vw", marginTop: "auto", marginBottom: "auto"}}>
           {this.state.showItem ?
            <img
              key={item.item_id}
              className="item-detail-img"
              src={getImage(item.item_name, item.category, item.item_id)}
              //src = {`/item_images/${item.item_id}.jpg`}
              alt="Item Image"
              onError={(e)=>{e.target.onerror=null; e.target.src=getImage(item.category)}}
            />    
            :  <img
            key={item.item_id}
            className="item-detail-img"
            src={getImage(item.item_name, item.category, item.item_id)}
            //src = {`/item_images/${item.item_id}.jpg`}
            alt="Item Image"
            onError={(e)=>{e.target.onerror=null; e.target.src=getImage(item.category)}}
          />     }
          </div>
          <div className="col-3" >
            <div className="item-title">
              {item.item_name}
              <span style={{marginLeft: "1rem"}}></span>
              <Try id={item.item_id} ar={item.ar}></Try>
            </div>
            <div className="item-by">by<span> </span>
              <Link to={"/showShowAllUserItems/" + item.email} style={{color: "#53b46e"}}>
                <span>{item.user_name}</span>
              </Link>
            </div>
            {/* <div className="item-by">{item.category}</div> */}
            {item.vr_file_path ?
            <div className="item-desc"><Link to  = {`/vr/${item.item_id}`} target="_blank">Try VR</Link></div>
            : null }
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

function getImage(name, category, id) {
  let m = {
    'red_blazer': red_blazer,
    'orange_blazer': orange_blazer,
    'yellow_blazer': yellow_blazer,
    'green_blazer': green_blazer,
    'blue_blazer': blue_blazer,
    'purple_blazer': purple_blazer,
    'pink_blazer': pink_blazer,
    'white_blazer': white_blazer,
    'black_blazer': black_blazer,
    'gray_blazer': gray_blazer,
    'red_sweater': red_sweater,
    'orange_sweater': orange_sweater,
    'yellow_sweater': yellow_sweater,
    'green_sweater': green_sweater,
    'blue_sweater': blue_sweater,
    'purple_sweater': purple_sweater,
    'pink_sweater': pink_sweater,
    'white_sweater': white_sweater,
    'black_sweater': black_sweater,
    'gray_sweater': gray_sweater,
    'red_jacket': red_jacket,
    'orange_jacket': orange_jacket,
    'yellow_jacket': yellow_jacket,
    'green_jacket': green_jacket,
    'blue_jacket': blue_jacket,
    'purple_jacket': purple_jacket,
    'pink_jacket': pink_jacket,
    'white_jacket': white_jacket,
    'black_jacket': black_jacket,
    'gray_jacket': gray_jacket,
    'red_hoodie': red_hoodie,
    'orange_hoodie': orange_hoodie,
    'yellow_hoodie': yellow_hoodie,
    'green_hoodie': green_hoodie,
    'blue_hoodie': blue_hoodie,
    'purple_hoodie': purple_hoodie,
    'pink_hoodie': pink_hoodie,
    'white_hoodie': white_hoodie,
    'black_hoodie': black_hoodie,
    'gray_hoodie': gray_hoodie,
    'red_pants': red_pants,
    'orange_pants': orange_pants,
    'yellow_pants': yellow_pants,
    'green_pants': green_pants,
    'blue_pants': blue_pants,
    'purple_pants': purple_pants,
    'pink_pants': pink_pants,
    'white_pants': white_pants,
    'black_pants': black_pants,
    'gray_pants': gray_pants,
    'red_shorts': red_shorts,
    'orange_shorts': orange_shorts,
    'yellow_shorts': yellow_shorts,
    'green_shorts': green_shorts,
    'blue_shorts': blue_shorts,
    'purple_shorts': purple_shorts,
    'pink_shorts': pink_shorts,
    'white_shorts': white_shorts,
    'black_shorts': black_shorts,
    'gray_shorts': gray_shorts,
    'red_sweatpants': red_sweatpants,
    'orange_sweatpants': orange_sweatpants,
    'yellow_sweatpants': yellow_sweatpants,
    'green_sweatpants': green_sweatpants,
    'blue_sweatpants': blue_sweatpants,
    'purple_sweatpants': purple_sweatpants,
    'pink_sweatpants': pink_sweatpants,
    'white_sweatpants': white_sweatpants,
    'black_sweatpants': black_sweatpants,
    'gray_sweatpants': gray_sweatpants,
    'red_cardigan': red_cardigan,
    'orange_cardigan': orange_cardigan,
    'yellow_cardigan': yellow_cardigan,
    'green_cardigan': green_cardigan,
    'blue_cardigan': blue_cardigan,
    'purple_cardigan': purple_cardigan,
    'pink_cardigan': pink_cardigan,
    'white_cardigan': white_cardigan,
    'black_cardigan': black_cardigan,
    'gray_cardigan': gray_cardigan,
    'red_vest': red_vest,
    'orange_vest': orange_vest,
    'yellow_vest': yellow_vest,
    'green_vest': green_vest,
    'blue_vest': blue_vest,
    'purple_vest': purple_vest,
    'pink_vest': pink_vest,
    'white_vest': white_vest,
    'black_vest': black_vest,
    'gray_vest': gray_vest,
    'red_jeans': red_jeans,
    'orange_jeans': orange_jeans,
    'yellow_jeans': yellow_jeans,
    'green_jeans': green_jeans,
    'blue_jeans': blue_jeans,
    'purple_jeans': purple_jeans,
    'pink_jeans': pink_jeans,
    'white_jeans': white_jeans,
    'black_jeans': black_jeans,
    'gray_jeans': gray_jeans,
  };

  let a = name.split(' ');
  let k = 'blah';
  if(a.length === 3) {
    k = a[1] + '_' + a[2];
  }
  if(k in m) {
    return m[k];
  } else {
    if (id) {
      return `/item_images/${id}.jpg`;
    } else {
      return clothingJpg;
    }
   
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


















