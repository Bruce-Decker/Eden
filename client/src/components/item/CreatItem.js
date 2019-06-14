import React, { Component } from 'react';
import { connect } from 'react-redux'
import RegularBanner from '../banner/RegularBanner'
import axios from 'axios'

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_name: '',
            item_image: null,
            vr_file: null,
            category: '',
            description: '',
            price: '',
            bid_price: '',
            errors: {}
        }
    }

    handleImage = event => {
        console.log('uploaded')
        let item_image = event.target.files[0]
        this.setState({item_image: item_image})
    }

    handleVRFile = event => {
        console.log('uploaded')
        let vr_file = event.target.files[0]
        this.setState({vr_file: vr_file})
       
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    } 

    onSubmit = (e) => {
        e.preventDefault()
        let item_image = this.state.item_image
        let vr_file = this.state.vr_file
        let formdata = new FormData()
        formdata.append('item_name', this.state.item_name)
        formdata.append('filename', item_image)
        formdata.append('filename', vr_file)
        formdata.append('category', this.state.category)
        formdata.append('description', this.state.description)
        formdata.append('price', this.state.price)
        formdata.append('bid_price', this.state.bid_price)
      
        axios.post('/items/createItem', formdata)
            .then(res => 
                {
                    console.log(res)
                    window.location.reload()
                    
                })
            .catch(err => console.log(err))

       
        
      
       
    }

    render() {
        const { errors } = this.state
         return (
             <div>
                 <RegularBanner />
                 <div className = "createItem" >
                     <h1>Hi {this.props.auth.user.name}. Please create Item </h1>
                     <form onSubmit = {this.onSubmit} className="ui form">
                            <div className="field">
                            <label> Item Name</label>
                            <input type="text" name="item_name" placeholder="Item Name"  onChange = {this.onChange}/>
                            </div>

                                   <div className = "inputError">
                                            {errors.item_Name }
                                    </div>  
                         <div className="field">
                                <label> Upload an image </label>
                                <input type="file" name="filename" id="fileToUpload"  onChange = {this.handleImage}/>
                        </div>
                        <div className="field">
                                <label> Upload a VR file </label>
                                <input type="file" name="filename" id="fileToUpload"  onChange = {this.handleVRFile}/>
                        </div>

                        <div className="field">
                            <label> Category </label>
                            <input type="text" name="category" placeholder="Category"  onChange = {this.onChange}/>
                        </div>

                                   <div className = "inputError">
                                            {errors.category }
                                    </div> 
                        
                        <div className="field">
                            <label> Description </label>
                            <input type="text" name="description" placeholder="Description"  onChange = {this.onChange}/>
                        </div>

                                   <div className = "inputError">
                                            {errors.description }
                                    </div> 

                        


                       <div className="field">
                            <label> Price </label>
                            <input type="text" name="price" placeholder="Price"  onChange = {this.onChange}/>
                        </div>

                                   <div className = "inputError">
                                            {errors.price }
                                    </div> 



                     
                     <div className="field">
                            <label>Bid Price (optional) </label>
                            <input type="text" name="bid_price" placeholder="Bid Price"  onChange = {this.onChange}/>
                        </div>

                                   <div className = "inputError">
                                            {errors.bid_price }
                                    </div> 

                    
                   <div className="field">
                
                   </div>
                   
                    <button className="ui button" type="submit">Submit</button>
                
                   <div className="space">
                
                   </div>
                            

                    </form>
                 </div>
             </div>
         )

    }


}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps)(CreateItem) 