import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Engine3D } from '../engine'


Engine3D.Init({ canvasElement: document.getElementById('main') })

var cube = new Mesh(
  new BoxBufferGeometry(),
  new MeshBasicMaterial()
)

Engine3D.scene.add(cube);
Engine3D.camera.position.z = 5;

Engine3D.modules.push(
  {
    Update(dt) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
  }
)