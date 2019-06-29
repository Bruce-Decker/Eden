import React, { Component } from 'react';
import './Item.css';
import LocationPicker from 'react-location-picker';
import apple from '../../images/apple.png'
import star from '../../images/rating.png'
import map from '../../images/map.jpg'
import axios from 'axios'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


const reviews = [
  {
    user: 'John',
    img: apple,
    review: 'Apples are extremely rich in important antioxidants, flavanoids, and dietary fiber. The phytonutrients and antioxidants in apples may help reduce the risk of developing cancer, hypertension, diabetes, and heart disease.',
    date: '2 days ago',
    rating: [1, 2, 3, 4]
  },
  {
    user: 'Bob',
    img: apple,
    review: 'Apples are high in fiber and water — two qualities that make them filling.',
    date: '6 days ago',
    rating: [1, 2, 3]
  },
]

var defaultPosition

class Review extends Component {

  constructor(props){
    super(props)
    this.state = {
   
      position: {
         lat: 37.7749,
         lng: -122.4194
      },
      showMap: false
  }
  }

  async componentDidMount() {
    const response = await axios.get('/items/' + this.props.item_id)
    console.log(response.data[0].latitude)
    console.log(typeof(response.data[0].latitude))
   if (response.data[0]) {
        this.setState({
          item: response.data[0],
          position: {
             lat: response.data[0].longitude,
             lng: response.data[0].latitude
          },
          showMap: true
      })
      
   }
  
   
  }

  render() {
    const defaultPosition = {
      lat: this.state.position.lat,
      lng: this.state.position.lng
  };
  
    return (
      <div class="container-review">
        <div class="item-header">Reviews </div>
      
        <div class="row" style={{marginTop: "1rem"}}>
          <div class="col-5">
           
              <LocationPicker
                                    containerElement={ <div style={ {height: '100%'} } /> }
                                    mapElement={ <div style={ {height: '400px'} } /> }
                                    defaultPosition={defaultPosition}
                                    onChange={this.handleLocationChange}
                                    zoom = {14}
                                />
                                
         
          </div>
          <div class="col-7">
            <ul class="item-review-list">
              {reviews.map(review => {
                return (
                  <li key={review.user} class="item-review-item row">
                    <div class="col-3">
                      <img class="item-recommendation-img" style={{width: "100%"}} src={review.img} alt="Item"></img>
                      <div class="item-recommendation-title">{review.user}</div>
                    </div>
                    <div class="col-6">
                      <div>{review.review}</div>
                      <div>
                        {review.rating.map(i => {
                          return <img key={i} class="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                        })}
                      </div>
                      <div style={{marginTop: "1rem", color: "#888888"}}>{review.date}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;