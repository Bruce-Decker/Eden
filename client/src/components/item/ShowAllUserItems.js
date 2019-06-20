import React, { Component } from 'react';
import { connect } from 'react-redux'
import RegularBanner from '../banner/RegularBanner'
import axios from 'axios'
import star from '../../images/rating.png'
import { Card } from 'react-bootstrap'

import { BrowserRouter as Route, Link } from 'react-router-dom';

class ShowAllUserItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            show: false
        }


    }

    async componentDidMount() {
        var response = await axios.get('/items/getAllItemsForUser/' + this.props.auth.user.email)
        console.log(response)
        this.setState({
            items: response.data,
            show: true
        })
    }


    render() {
        return (
            <div>
                <RegularBanner />
                <div className = "container list-container" >
                <div className="items-row">
                    {this.state.show ? 
                    <div>
                            { this.state.items.map(item =>
                              <Card>
                                    <div className="row">
                                        <div >
                                            <Link to={"/items/" + item.item_id}>
                                            {/* <div onClick={() => window.scrollTo(0, 0)}>*img</div> */}
                                            <img key={item._id} src= {item.item_image} alt="Rating" style={{width: "250px", height: "250px"}}/>
                                        
                                            </Link>
                                        
                                        </div>
                                        <div className="col-8">
                                        <Link to={"/items/" + this.props.id} style={{textDecoration: "none"}}>
                                            <div className="items-name" onClick={() => window.scrollTo(0, 0)}>{this.props.name}</div>
                                        </Link>
                                        <div><b> Item Name <i class="fas fa-file-signature"></i>: </b>    {item.item_name}</div>
                                        <div> <b> Item Id <i class="fas fa-barcode"></i>:</b>${item.item_id}</div>
                                        <div> <b> Description: </b> {item.description}</div>
                                        <div> <b> Category <i class="fas fa-apple-alt"></i>: </b>  {item.category}</div>
                                        <div><b> Price : <i class="fas fa-dollar-sign"></i></b> {item.price}</div>
                                        <div><b> Bid Price: <i class="fas fa-dollar-sign"></i></b> {item.bid_price}</div>
                                        <div>{this.props.description}</div>
                                        </div>
                                    </div>
                                    </Card>
                                )}
                                </div>
                                : null }
        </div>
                </div>

              
            </div>
        )



    }




}



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps)(ShowAllUserItems) 