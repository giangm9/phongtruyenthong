import { Color } from 'three';
import { GLTFLoad } from '../../modules/GLTFLoad';
import { LightMapper } from '../../modules/LightMapper';
import { Orbit } from '../../modules/Orbit';
import { Engine3D } from '../engine'


Engine3D.Init({ canvasElement: document.getElementById('main') });
Engine3D.camera.position.z = 5;
Engine3D.scene.background = new Color(0xffffff);

// GLTF
GLTFLoad.Init({ dracoPath: 'draco-gltf/' })

GLTFLoad.OnGLTFLoaded.push(gltf => {
  Engine3D.scene.add(gltf.scene)

})
GLTFLoad.Load('data/lightmap.glb')

// Lightmapper
LightMapper.Init(obj => {
  if (obj.userData.TLM_ObjectProperties?.tlm_mesh_lightmap_use == 1) {
    return `data/lightmap/${obj.name}_denoised.hdr`
  }
  return null
})
GLTFLoad.OnGLTFLoaded.push(LightMapper.ProcessGLTF)


// Controls
Orbit.Init();
Orbit.controls.enableDamping = true;
Engine3D.modules.push(Orbit);