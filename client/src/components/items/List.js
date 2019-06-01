import React, { Component } from 'react';
import Item from './Item';

import { connect } from 'react-redux'
import { getItems, getItemsByCategory, getItemsByPageNumber } from '../../redux/actions/ItemActions'
import Pagination from 'react-js-pagination';


class List extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(pageNumber) {
    window.scrollTo(0, 0);
    this.props.getItemsByPageNumber(this.props.category, pageNumber);
  }

  render() {
    const items = this.props.items.data.map((item) =>
      <Item key={item.item_id}
            id={item.item_id}
            name={item.item_name}
            description={item.description}
            rating={item.average_rating}
            price={item.price}/>
    );
    return (
      <div className="container list-container">
        <div className="list-header">{this.props.category.toUpperCase()}</div>
        <div>
          {items}
        </div>
        <div id='pagination' style={{marginTop: "3rem", marginBottom: "3rem"}}>
          <Pagination
            prevPageText='prev'
            nextPageText='next'
            firstPageText='first'
            lastPageText='last'
            activePage={this.props.items.activePage}
            itemsCountPerPage={this.props.items.itemsPerPage}
            totalItemsCount={this.props.items.numItems}
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
      </div>
    )
  }
  componentWillMount() {
    this.props.getItemsByCategory(this.props.category);
  }
}

const mapDispatchToProps = dispatch => {
  return({
    getItems: () => {
      dispatch(getItems())
    },
    getItemsByCategory: (category) => {
      dispatch(getItemsByCategory(category))
    },
    getItemsByPageNumber: (category, pageNumber) => {
      dispatch(getItemsByPageNumber(category, pageNumber))
    }
  })
};

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);