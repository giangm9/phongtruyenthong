import { Object3D } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

var textureLoader = new RGBELoader();

var provider = null;

function Init(lightmapProvider: (object: Object3D) => string) {
  provider = lightmapProvider;
}

function ProcessGLTF(gltf: GLTF) {
  
  
  gltf.scene.traverse(processObj)
}

async function processObj(obj: Object3D) {
  const url = provider(obj)
  if (url != null) {
    const texture = await textureLoader.loadAsync(url)
    texture.flipY = false;
    // @ts-ignore
    obj.material.lightMap = texture;
    // @ts-ignore
    obj.material.needsUpdate = true;
  }
}

export const LightMapper = {
  Init,
  ProcessGLTF,
}