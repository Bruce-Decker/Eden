import React, { Component } from 'react';
import Item from './Item';

import { connect } from 'react-redux'
import { getItems, getItemsByCategory } from '../../redux/actions/ItemActions'


class List extends Component {

  render() {
    console.log(this.props.items)
    const items = this.props.items.data.map((item) =>
      <Item key={item.item_id}
            id={item.item_id}
            name={item.item_name}
            description={item.description}
            rating={item.average_rating}
            price={item.price}/>
    );
    return (
      <div class="container list-container">
        <div class="list-header">{this.props.category.toUpperCase()}</div>
        <div>
          {items}
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