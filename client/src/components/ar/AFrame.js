import React, { Component } from 'react';
import './Ar.css';

import { AFrameRenderer, Marker } from 'react-web-ar'


class AFrame extends Component {
  z = 0
  x = 0
  scale = 5
  render() {
    const ar = this.props.ar
    const id = this.props.id
    return (
      <div>
        <div style={{position: "fixed", right: "20rem", bottom: "5px", zIndex: "10"}}>
          <button className="ar-move-button" onClick={() => {this.adjust('up')}}>U</button>
          <button className="ar-move-button" onClick={() => {this.adjust('down')}}>D</button>
          <button className="ar-move-button" onClick={() => {this.adjust('left')}}>L</button>
          <button className="ar-move-button" onClick={() => {this.adjust('right')}}>R</button>
        </div>
        <div style={{position: "fixed", right: "15rem", bottom: "5px", zIndex: "10"}}>
          <button className="ar-move-button" onClick={() => {this.adjust('upScale')}}>+</button>
          <button className="ar-move-button" onClick={() => {this.adjust('downScale')}}>-</button>
        </div>
        <AFrameRenderer inherent={true}>
          <Marker parameters={{ preset: "hiro" }}>
            <a-entity
              id="entity"
              rotation="270 0 0"
              position={this.x + " 0 " + this.z}
              scale={this.scale + " " + this.scale + " " + this.scale}
              geometry={"primitive: plane;"}
              material={"shader: flat; src: /item_images/" + id + "_" + ar}>
            </a-entity>
          </Marker>
        </AFrameRenderer>
      </div>
    );
  }

  adjust(dir) {
    const val = 0.2;
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
      case 'upScale':
        this.scale += val;
        break;
      case 'downScale':
        this.scale -= val;
        break;
      default:
    }
    var entity = document.querySelector('#entity');
    entity.object3D.position.set(this.x, 0, this.z);
    entity.object3D.scale.set(this.scale, this.scale, this.scale);
  }
}


export default AFrame;