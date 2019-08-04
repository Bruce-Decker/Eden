import React, { Component } from 'react';
import Item from './Item';

import axios from 'axios'

import Pagination from 'react-js-pagination';


class List extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this)
    this.state = {
      items: []
    };
  }

  async handlePageChange(pageNumber) {
    window.scrollTo(0, 0);
    const response = await axios.get('/items/?category=' + this.props.category + '&page=' + pageNumber)
    this.setState({
        items: response.data.items,
        activePage: pageNumber
    })
  }

  helper = (item) => {
    var sum = 0
    item.comments.map(comment => {
       sum = sum + comment.star_rating
    })
    return Math.round(sum / item.comments.length)
  }

  render() {
    if (this.state.items != null) {
      
      const items = this.state.items.map((item) =>
    <div>
        {item.comments.length > 0 ?
            <Item key={item.item_id} item={item} star_rating = { 
                this.helper(item)
               
             }/>
            : 
            <Item key={item.item_id} item={item} star_rating = {0}/>
        }
        </div>
      
     
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
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsPerPage}
              totalItemsCount={this.state.numItems}
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
    return null
  }
  async componentWillMount() {
    const response = await axios.get('/items/?category=' + this.props.category)
    this.setState({
        items: response.data.items,
        activePage: 1,
        numItems: response.data.numItems,
        itemsPerPage: response.data.itemsPerPage
    })
  }
}

export default List