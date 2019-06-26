import React, { Component } from 'react';
import './Cart.css';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class OtherBoughtItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recs: []
    };
  }

  componentWillMount() {
    // show user-based recommendations
    let email = this.props.auth.user.email;
    let params = {
      email: 'hoxodo@atech5.com'
    }
    
    axios
      .post('/recs/getUserRecs', params)
      .then(res => {
        console.log(res);
        this.setState({
          recs: res.data
        })
      })
      .catch(err =>
        console.log(err)
      );
  }

  render() {
    return (
      <div id="user-recs-1">
        <h3 id="user-recs-h3">Other Users Bought</h3>
        <div className="user-recs-2">
          {this.state.recs.slice(0,10).map(rec => {
            return (
              <div key={"obi-"+rec.id} className="user-recs-3">
                <div>
                  <img className="user-recs-img" style={{width: "100%"}} src={rec.image} alt="Item"></img>
                </div>
                <div>
                  <Link to={"/items/" + rec.id}>
                    <span className="user-recs-title" onClick={() => window.scrollTo(0, 0)}>{rec.name}</span>
                  </Link>
                  <div>{rec.price}</div>
                  <div>{rec.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  }
};

export default connect(
  mapStateToProps
)(OtherBoughtItems);













