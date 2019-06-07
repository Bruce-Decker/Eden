import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Entity, Scene} from 'aframe-react';
import  background_image  from  '../../images/VR_background_1.jpg'
import axios from 'axios'

var response;
class VR extends React.Component {

    constructor() {
        super();
        this.state = {
            item_id: '',
            file_name: '',
            upload_time: '',
            file_path: '',
            showFile: false
        }
    }

    async componentDidMount() {
         response = await axios.get('/upload/retrieveFile/' + this.props.match.params.item_id)
         console.log(response)
         this.setState({
            file_path: response.data.file_path,
            showFile: true
         })
    }

    
    render () {
        return (
            <Scene>
       <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
        <Entity particle-system={{preset: 'snow'}}/>
        <Entity light={{type: 'point'}}/>
        {this.state.showFile ?
            <a-assets>        
              <a-asset-item id="model2" src= {response.data.file_path + '/scene.gltf'}></a-asset-item>
            </a-assets>
            : null }
        <Entity

            gltf-model="#model2"
            scale="0.1 0.1 0.1"
        
        />
       <Entity primitive='a-sky' src={background_image}/>
      </Scene>
        )
    }

}

export default VR;