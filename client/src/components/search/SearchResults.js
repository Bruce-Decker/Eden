import React, { Component } from 'react';
import './SearchResults.css';
import Pagination from 'react-js-pagination';

import Category from '../../components/category/Category';
import Footer from '../footer/Footer';
import LandingBanner from '../banner/LandingBanner';
import RegularBanner from '../banner/RegularBanner';
import SearchResultItems from './SearchResultItems';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSearchResults, getSearchPage } from '../../redux/actions/SearchActions';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentWillMount() {
    // on load, show first page (pages are one-indexed)
    this.props.getSearchResults(1);
  }

  componentDidMount() {
    console.log(this.props);

    // handle search queries from this page
    this.unlisten = this.props.history.listen((location, action) => {
      let url = window.location.href;

      // make sure we're on the search page before
      // attempting to get search results
      if(url.indexOf('search') > -1) {
        this.props.getSearchResults(1);
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handlePageChange(pageNumber) {
    this.props.getSearchResults(pageNumber);
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
        <SearchResultItems
          items={this.props.search.items}
          searchType={this.props.search.searchType}
        />
        <div id='pagination'>
          <Pagination
            prevPageText='prev'
            nextPageText='next'
            firstPageText='first'
            lastPageText='last'
            activePage={this.props.search.activePage}
            itemsCountPerPage={this.props.search.itemsPerPage}
            totalItemsCount={this.props.search.numItems}
            onChange={this.handlePageChange}
            activeClass='pn-active'
            activeLinkClass='pn-active-link'
            itemClass='pn-item'
            itemClassFirst='pn-item-first'
            itemClassPrev='pn-item-prev'
            itemClassNext='pn-item-next'
            itemClassLast='pn-item-last'
            disabledClass='pn-disabled'
          />
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
    getSearchResults: pageNumber => {
      dispatch(getSearchResults(pageNumber));
    }
  });
};

const mapStateToProps = state => {
  return {
    search: state.search
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults));


























