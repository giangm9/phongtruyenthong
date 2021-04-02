import { Engine3D } from "../../esael";
import { PerspectiveCamera, Vector3 } from "three";


const keyStates = {};

const playerVelocity = new Vector3();
const playerDirection = new Vector3();
var camera: PerspectiveCamera;
var canvas: HTMLCanvasElement;

function Init() {
  camera = Engine3D.camera
  canvas = Engine3D.canvas;

  camera.rotation.order = 'YXZ';
  camera.position.y = 2;

  canvas.addEventListener('click', () => canvas.requestPointerLock())
  document.getElementById('dom-scene').addEventListener('click', () => canvas.requestPointerLock())

  canvas.addEventListener('mousemove', event => {

    if (document.pointerLockElement === canvas) {
      camera.rotation.y -= event.movementX / 500;
      camera.rotation.x -= event.movementY / 500;
    }
  })

  document.addEventListener('keydown', (event) => {
    keyStates[event.code] = true;
  });

  document.addEventListener('keyup', (event) => {

    keyStates[event.code] = false;

  });

  Engine3D.modules.push({ Update })
}

function Update(dt) {
  const speed = 25;
  if (keyStates['KeyW']) {

    playerVelocity.add(getForwardVector().multiplyScalar(speed * dt));

  }

  if (keyStates['KeyS']) {

    playerVelocity.add(getForwardVector().multiplyScalar(- speed * dt));

  }

  if (keyStates['KeyA']) {

    playerVelocity.add(getSideVector().multiplyScalar(- speed * dt));

  }

  if (keyStates['KeyD']) {

    playerVelocity.add(getSideVector().multiplyScalar(speed * dt));

  }

  if (keyStates['KeyD']) {

    playerVelocity.add(getSideVector().multiplyScalar(speed * dt));

  }



  const damping = Math.exp(- 3 * dt) - 1;
  playerVelocity.addScaledVector(playerVelocity, damping);
  const deltaPosition = playerVelocity.clone().multiplyScalar(dt);
  camera.position.add(deltaPosition)
}

function getForwardVector() {

  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();

  return playerDirection;

}

function getSideVector() {

  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();
  playerDirection.cross(camera.up);

  return playerDirection;

}

export const FPSControls = { Init, Update }