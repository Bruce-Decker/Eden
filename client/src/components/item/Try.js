import React from 'react';
import './Detail'

import { BrowserRouter as Route, Link } from 'react-router-dom';

const Try = (props) => {
  if (props.ar != null) {
    return (
      <Link style={{color: 'black'}} to={{pathname: '/items/' + props.id + '/ar', state: {ar: props.ar, id: props.id}}}>
        <button class="item-button">Try it!</button>
      </Link>
    )
  } else {
    return null
  }
}

export default Try