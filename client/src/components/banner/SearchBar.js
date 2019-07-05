import React, { Component } from 'react';
import '../../containers/App.css';
import './SearchBar.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty.js';
import search from '../../images/search.png';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      category: 'itm-all'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  handleSelect(event) {
    this.setState({
      category: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let kw = this.state.keyword;

    if(!isEmpty(kw)) {
      let cg = this.state.category;

      let url = '/search?kw=' + kw + '&cg=' + cg;

      this.props.history.push(url);
    }
  }

  render() {
    return (
      <form className="form-search" onSubmit={this.handleSubmit}>
        <div className="styled-select">
          <select onChange={this.handleSelect}>
            <option value="itm-all">All Items</option>
            <option value="itm-appliances">&emsp;Appliances</option>
            <option value="itm-arts">&emsp;Arts</option>
            <option value="itm-books">&emsp;Books</option>
            <option value="itm-clothing">&emsp;Clothing</option>
            <option value="itm-computers">&emsp;Computers</option>
            <option value="itm-electronics">&emsp;Electronics</option>
            <option value="itm-games">&emsp;Games</option>
            <option value="itm-home">&emsp;Home</option>
            <option disabled="disabled">---------------</option>
            <option value="svc-all">All Services</option>
            <option value="svc-contractors">&emsp;Contractors</option>
            <option value="svc-landscapers">&emsp;Landscapers</option>
            <option value="svc-electricians">&emsp;Electricians</option>
            <option value="svc-locksmiths">&emsp;Locksmiths</option>
            <option value="svc-cleaners">&emsp;Cleaners</option>
            <option value="svc-movers">&emsp;Movers</option>
            <option value="svc-hvac">&emsp;HVAC</option>
            <option value="svc-plumbers">&emsp;Plumbers</option>
          </select>
        </div>

        <input
          type="text"
          className="input-search"
          placeholder="Search..."
          value={this.state.keyword}
          onChange={this.handleChange}
        />

        <button type="submit" className="button-search">
          <img src={search} height="24" width="24" alt="Search"></img>
        </button>
      </form>
    );
  }
}

export default withRouter(SearchBar);