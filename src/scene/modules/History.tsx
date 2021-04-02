import { Engine3D } from '../../esael';
import { GLTFLoad } from '../../esael/modules/GLTFLoad';
import React from "react"
import ReactDOM from "react-dom";
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Object3D } from "three"
import { emitCustomEvent } from 'react-custom-events';
import { HistoryTimeline } from '../components/HistoryTimeline';


const renderer = new CSS3DRenderer();
var container: HTMLDivElement = null;
var historyWall: Object3D = null;
var wallObject: CSS3DObject = null;

function Init() {
  renderer.setSize(Engine3D.canvas.offsetWidth, Engine3D.canvas.offsetHeight);
  document.getElementById('dom-scene').appendChild(renderer.domElement)
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';



  container = document.createElement('div');
  ReactDOM.render(<HistoryTimeline />, container)
  wallObject = new CSS3DObject(container);
  Engine3D.scene.add(wallObject);
  Engine3D.modules.push({ Update })

  GLTFLoad.OnGLTFLoaded.push(gltf => {
    historyWall = gltf.scene.getObjectByName('HistoryWall');
    wallObject.position.copy(historyWall.position);
    wallObject.rotation.copy(historyWall.rotation);
    wallObject.scale.multiplyScalar(0.02);
    historyWall.visible = false;
  })
  
}


function Update() {

  renderer.render(Engine3D.scene, Engine3D.camera);
}

export const History = {
  Init,
  get container() { return container },
  get renderer() { return renderer }
}