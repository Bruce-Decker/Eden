import React, { Component } from 'react';
import './Product.css';

import { BrowserRouter as Route, Link } from 'react-router-dom';

class Scroller extends Component {
  render() {
    return (
      <div class="row-fluid product-container">
        <div class="product-header">{this.props.header}</div>
          <div class="col-lg-12 col-md-10 ">
            <div class="cover-container">
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
              <div class="cover-item" style={{backgroundImage: 'https://d1nexqccu6ll7z.cloudfront.net/_images/s-14-197-61462CCC-uk.png'}}></div>
            </div>
        </div>
      </div>
    )
  }
}

export default Scroller;