
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import  image  from  '../../uploads/1.jpg'

 
class VRScene extends React.Component {
  render () {
    return (
      <Scene>
       <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
        <Entity particle-system={{preset: 'snow'}}/>
        <Entity light={{type: 'point'}}/>
            <a-assets>        
              <a-asset-item id="model2" src='/uploads/timberland_boots/scene.gltf'></a-asset-item>
            </a-assets>
  <Entity

    gltf-model="#model2"
    scale="0.1 0.1 0.1"
  
  />
       <Entity primitive='a-sky' src={image}/>
      </Scene>
    );
  }
}

export default VRScene;