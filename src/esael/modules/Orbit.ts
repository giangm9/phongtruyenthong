import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Engine3D } from "../src/engine";

var controls: OrbitControls;
function Init() {
  controls = new OrbitControls(Engine3D.camera, Engine3D.canvas);
}

export var Orbit = {
  Init,
  Update() { controls.update() },
  get controls() { return controls },
}