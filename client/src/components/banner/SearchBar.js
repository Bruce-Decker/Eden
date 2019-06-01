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
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let val = this.state.value;

    if(!isEmpty(val)) {
      var url = '/search/' + val;
      this.props.history.push(url);
    }
  }

  render() {
    return (
      <form className="form-search" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input-search"
          placeholder="Search..."
          value={this.state.value}
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