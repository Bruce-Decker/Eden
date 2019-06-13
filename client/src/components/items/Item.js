import React, { Component } from 'react';
import star from '../../images/rating.png'

import { BrowserRouter as Route, Link } from 'react-router-dom';


class Item extends Component {
  
  constructor() {
     super()
  }

  

  render() {
    return (
      <div>
        <div className="items-row">
          <div className="row">
              <div className="col-4" style={{backgroundColor: "#f2ffea", textAlign: "center", lineHeight: "275px"}}>
                <Link to={"/items/" + this.props.id}>
                  <div onClick={() => window.scrollTo(0, 0)}>*img</div>
                </Link>
              </div>
            <div className="col-8">
              <Link to={"/items/" + this.props.id} style={{textDecoration: "none"}}>
                <div className="items-name" onClick={() => window.scrollTo(0, 0)}>{this.props.name}</div>
              </Link>
              <div>
                {Array.from(Array(this.props.rating), (e, i) => {
                  return <img key={i} src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                })}
              </div>
              <div className="items-price">${this.props.price}</div>
              <div className="items-description">{this.props.description}</div>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
    )
  }

}

export default Item;