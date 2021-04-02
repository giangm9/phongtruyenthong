import { Engine3D } from '../esael'
import { GLTFLoad } from "../esael/modules/GLTFLoad";
import { EnvLoader } from '../esael/modules/EnvLoader'
import { FPSControls } from './modules/FPSControls';
import { History } from './modules/History';
import { Walls } from './modules/Walls';



Engine3D.Init({ canvasElement: document.getElementById('scene') })
Engine3D.camera.position.z = 5;
// Engine3D.autoClear

// Load scene
GLTFLoad.Init({ dracoPath: 'draco-gltf/' })

GLTFLoad.Load('data/room.glb')

GLTFLoad.OnGLTFLoaded.push(gltf => {
  Engine3D.scene.add(gltf.scene)
})

// Add Env
EnvLoader.Init();
EnvLoader.Load('data/lebombo_1k.hdr')

//
//Orbit.Init();
FPSControls.Init();


// Walls
Walls.Init();

