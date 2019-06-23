import React, { Component } from 'react';
import './Category.css';

// eslint-disable-next-line
import { BrowserRouter as Route, Link } from 'react-router-dom';

class Category extends Component {
    render() {
        if(this.props.default) {
            return (
                <div class="container-category" style={{backgroundColor: this.props.color}}>
                    <div class="row align-items-center" style={{height: "90vh"}}>
                        <div class="col-8" style={{paddingLeft: "8vw", paddingRight: "8vw"}}>
                            <img src={this.props.image} alt="Category" style={{minWidth: "100%", maxWidth: "100%"}}></img>
                        </div>
                        <div class="col-4" style={{paddingRight: "7vw", paddingLeft: "7vw"}}>
                            <h3 class="text-center" style={{fontSize: "32px", fontWeight: "bold"}}>
                                {this.props.category}
                            </h3>
                            <h6 class="text-center">
                                <small>{this.props.description}</small>
                            </h6>
                            <Link style={{textDecoration: 'none'}} to={this.props.category.toLowerCase()}>
                                <button onClick={() => window.scrollTo(0, 0)} class="button-shop">Shop</button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class="container-category" style={{backgroundColor: this.props.color}}>
                    <div class="row align-items-center" style={{height: "90vh"}}>
                        <div class="col-4" style={{paddingRight: "8vw", paddingLeft: "8vw"}}>
                            <h3 class="text-center" style={{fontSize: "32px", fontWeight: "bold"}}>
                                {this.props.category}
                            </h3>
                            <h6 class="text-center">
                                <small>{this.props.description}</small>
                            </h6>
                            <Link style={{textDecoration: 'none'}} to={this.props.category.toLowerCase()}>
                                <button onClick={() => window.scrollTo(0, 0)} class="button-shop">Shop</button>
                            </Link>
                        </div>
                        <div class="col-8" style={{paddingLeft: "7vw", paddingRight: "7vw"}}>
                            <img src={this.props.image} alt="Category" style={{minWidth: "100%", maxWidth: "100%"}}></img>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Category;