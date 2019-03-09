import React, { Component } from 'react';
import './App.css';
import Landing from '../components/landing/Landing';

import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';




class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      
        <Route exact path="/" component={Landing} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
