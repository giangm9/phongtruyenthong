
import { Color } from "three";
import { GLTFLoad } from "../../modules/GLTFLoad";
import { Orbit } from "../../modules/Orbit";
import { Engine3D } from "../engine";

Engine3D.Init({ canvasElement: document.getElementById('main') })
Engine3D.camera.position.z = 5;
Engine3D.scene.background = new Color(0xffffff);

// GLTF
GLTFLoad.Init({ dracoPath: 'draco-gltf/' })

GLTFLoad.OnGLTFLoaded.push(gltf => {
  console.log('add gltf');
  Engine3D.scene.add(gltf.scene)
})
GLTFLoad.Load('data/cube.glb')


// Controls
Orbit.Init();
Orbit.controls.enableDamping = true;
Engine3D.modules.push(Orbit);