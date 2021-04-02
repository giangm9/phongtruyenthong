
import { PMREMGenerator } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Engine3D } from '../src/engine';
const rgbeLoader = new RGBELoader();
var pmremGenerator: PMREMGenerator;

function Init() {
  pmremGenerator = new PMREMGenerator(Engine3D.renderer);
}

function Load(url : string) {

  rgbeLoader
    .load(url, function (hdrEquirect) {

      const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
      hdrEquirect.dispose();

      Engine3D.scene.background = hdrCubeRenderTarget.texture;
      Engine3D.scene.environment = hdrCubeRenderTarget.texture;
    });
}

export const EnvLoader = {
  Init, Load
}