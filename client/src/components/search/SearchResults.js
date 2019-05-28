import React, { Component } from 'react';
import './SearchResults.css';
import axios from 'axios';

import Category from '../../components/category/Category';
import Footer from '../footer/Footer';
import LandingBanner from '../banner/LandingBanner';
import RegularBanner from '../banner/RegularBanner';
import SearchResultItems from './SearchResultItems';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };

    this.getSearchResults();
  }

  async getSearchResults() {
    // obtain url, containing search query
    let uri = window.location.href;

    // isolate search query
    let cmp = uri.substring(uri.lastIndexOf('/') + 1);

    // remove any extra query parameters
    if(cmp.indexOf('?') > -1) {
      cmp = cmp.substring(0, cmp.indexOf('?'));
    }

    let uri_dec = decodeURIComponent(cmp);
    let params = {
      simple: 'true',
      keyword: uri_dec
    };

    try {
      const res = await axios.get('/search/getSearchResults', {params:params});
      this.setState({
        results: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  showBanner() {
    // show the appropriate banner if user is logged in
    if(window.localStorage.getItem('jwtToken')) {
      return (<RegularBanner/>);
    } else {
      return (<LandingBanner/>);
    }
  }

  render() {
    return (
      <div>
        {this.showBanner()}
        <SearchResultItems items={this.state.results}/>
        <Footer/>
      </div>
    );
  }
}

export default SearchResults;