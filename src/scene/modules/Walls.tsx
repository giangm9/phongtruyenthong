import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Object3D } from "three"
import { Engine3D } from '../../esael';
import React from 'react';
import ReactDOM from "react-dom";
import { GLTFLoad } from '../../esael/modules/GLTFLoad';
import { HistoryTimeline } from '../components/HistoryTimeline';
import { DemoWall } from '../components/DemoWall';

const renderer = new CSS3DRenderer();

class WallInfo {
  container = document.createElement('div');
  object = new CSS3DObject(this.container);


  constructor(sceneObject: Object3D, component: React.ReactElement, scale = 0.02) {
    sceneObject.visible = false;
    this.object.position.copy(sceneObject.position);
    this.object.rotation.copy(sceneObject.rotation);
    ReactDOM.render(component, this.container)
    this.object.scale.multiplyScalar(scale);
    Engine3D.scene.add(this.object);
  }
}



function Init() {
  renderer.setSize(Engine3D.canvas.offsetWidth, Engine3D.canvas.offsetHeight);
  document.getElementById('dom-scene').appendChild(renderer.domElement)
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';

  Engine3D.modules.push({ Update });


  GLTFLoad.OnGLTFLoaded.push(gltf => {
    // new WallInfo(
    //   gltf.scene.getObjectByName('DemoWall'),
    //   <HistoryTimeline />
    // );
    new WallInfo(
      gltf.scene.getObjectByName('HistoryWall'),
      <DemoWall />,
      0.015
    )
    var hwall = gltf.scene.getObjectByName('HistoryWall');


    Engine3D.camera.position.set(-5.929561617822623, 2, 3.005008720261966);
    Engine3D.camera.lookAt(hwall.position)
    // @ts-ignore
    window.e = Engine3D;
  })
}

function Update() {

  renderer.render(Engine3D.scene, Engine3D.camera);
}

export const Walls = {
  Init,
  get renderer() { return renderer }
}