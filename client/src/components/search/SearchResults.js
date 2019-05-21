import React, { Component } from 'react';
import './SearchResults.css';

import Category from '../../components/category/Category';
import Footer from '../footer/Footer';
import LandingBanner from '../banner/LandingBanner';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LandingBanner/>
          <h1>Search Results</h1>
        <Footer/>
      </div>
    );
  }
}

export default SearchResults;