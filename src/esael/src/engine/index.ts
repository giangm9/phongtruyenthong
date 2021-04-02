import { ACESFilmicToneMapping, Clock, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";

export interface Module {
  Update?(dt: number): any;
}


const modules: Module[] = [];

var scene = new Scene()
var canvas: HTMLCanvasElement;
var camera: PerspectiveCamera;
var renderer: WebGLRenderer;


const clock = new Clock()

function Init({ canvasElement }) {
  canvas = canvasElement;
  renderer = new WebGLRenderer({ canvas, antialias: true })
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ACESFilmicToneMapping;
  camera = new PerspectiveCamera(75,
    canvas.offsetWidth / canvas.offsetHeight
    , 0.1, 1000);

  update()
}

function update() {
  requestAnimationFrame(update);
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
  const delta = clock.getDelta();

  modules.forEach(module => module.Update(delta))
  renderer.render(scene, camera);
}


export declare type EventCallback<T> = (arg: T) => any;
export declare type Event<T = any> = EventCallback<T>[];
export function emit<T>(e: Event<T>, data: T) {
  e.forEach(callback => data && callback(data))
}

export function once<T>(e: Event<T>, callback: EventCallback<T>) {
  var a = (data: T) => {
    callback(data)
    e.splice(e.indexOf(a));
  }
  e.push(a);
}

export const Engine3D = {
  scene,
  get camera() { return camera },
  get renderer() { return renderer },
  get canvas() { return canvas },
  modules,
  Init
}