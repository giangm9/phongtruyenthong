import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { emit, Event } from "../src/engine";

const loader = new GLTFLoader();

const OnGLTFLoaded: Event<GLTF> = [];

function Init({ dracoPath }) {
  if (dracoPath) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(dracoPath);
    loader.dracoLoader = dracoLoader;
  }

}

function Load(url: string) {
  loader.load(url, gltf => emit(OnGLTFLoaded, gltf))
}


export const GLTFLoad = {
  Init,
  Load,
  OnGLTFLoaded
}
