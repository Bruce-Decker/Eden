import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegularBanner from '../banner/RegularBanner';
import axios from 'axios';
import star from '../../images/rating.png';
import { Card } from 'react-bootstrap';
import './Item.css';

import { BrowserRouter as Route, Link } from 'react-router-dom';

class ShowAllUserItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      show: false
    }

    this.getBidVisibility = this.getBidVisibility.bind(this);
  }

  async componentDidMount() {
    var response = await axios.get('/items/getAllItemsForUser/' + this.props.auth.user.email)
    console.log(response)
    this.setState({
      items: response.data,
      show: true
    })
  }

  getBidVisibility(item) {
    // no bid price means that bidding is not supported for this item
    if (!('bid_price' in item) || item.bid_price == null) {
      return 'item-bids-hide';
    } else {
      return 'item-bids-show';
    }
  }

  render() {
    return (
      <div>
        <RegularBanner />
        <div id="shown-items-div1" className="container list-container">
          <div id="shown-items-div2" className="items-row">
            { this.state.show ? 
            <div id="shown-items-div3">
              { this.state.items.map(item =>
                <Link to={"/items/" + item.item_id}>
                  <div className="row shown-item-card">
                    <div className="col-12">
                      <div className="shown-item-text">
                        <span className="shown-item-name">Name:&nbsp;</span>
                        <span>{item.item_name}</span>
                      </div>
                      <div className="shown-item-text">
                        <span className="shown-item-description">Description:&nbsp;</span>
                        <span>{item.description}</span>
                      </div>
                      <div className="shown-item-text">
                        <span className="shown-item-category">Category:&nbsp;</span>
                        <span>{item.category}</span>
                      </div>
                      <div className="shown-item-text">
                        <span className="shown-item-price">Price:&nbsp;$</span>
                        <span>{item.price}</span>
                      </div>
                      <div className={"shown-item-text " + this.getBidVisibility(item)}>
                        <span className="shown-item-bid-price">Bid Price:&nbsp;$</span>
                        <span>{item.bid_price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            : null }
          </div>
        </div>  
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps)(ShowAllUserItems) 