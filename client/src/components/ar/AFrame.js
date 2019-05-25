import React, { Component } from 'react';
import './Ar.css';

import { AFrameRenderer, Marker } from 'react-web-ar'



class AFrame extends Component {
  z = 25
  x = 0
  render() {
    return (
      <div>
        <div style={{position: "fixed", right: "9rem", bottom: "5px", zIndex: "10"}}>
          <button class="ar-move-button" onClick={() => {this.move('up')}}>U</button>
          <button class="ar-move-button" onClick={() => {this.move('down')}}>D</button>
          <button class="ar-move-button" onClick={() => {this.move('left')}}>L</button>
          <button class="ar-move-button" onClick={() => {this.move('right')}}>R</button>
        </div>
       <AFrameRenderer inherent={true}>
          <Marker parameters={{ preset: "hiro" }}>
            <a-entity
              id="entity"
              gltf-model="./images/ar/t-shirt/scene.gltf"
              rotation="270 0 0"
              position={this.x + " 0 " + this.z}
              scale="7 7 7"
              >
            </a-entity>
          </Marker>
        </AFrameRenderer>
      </div>
    );
  }

  move(dir) {
    const val = 0.25;
    switch (dir){
      case 'up':
        this.z -= val;
        break;
      case 'down':
        this.z += val;
        break;
      case 'left':
        this.x -= val;
        break;
      case 'right':
        this.x += val;
        break;
      default:
    }
    var entity = document.querySelector('#entity');
    entity.object3D.position.set(this.x, 0, this.z);
  }
}


export default AFrame;