import { BufferAttribute, BufferGeometry, Clock, Mesh, Object3D } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export declare type Morp = {
  target: BufferGeometry;
  frames: BufferGeometry[]
}

export class MorphAnimation {
  state: 'play' | 'pause' | 'stop' = 'stop'
  frame: number = 0;
  loop: boolean = false;
  resetAtEnd = false;

  private totalTime = 0;
  from: number = 0;
  to: number = 0;

  get TPF() {
    return 1 / this.fps
  }

  constructor(
    public morps: Morp[],
    public fps = 24,
    public skipRate = 1
  ) { }

  update(dt: number) {
    this.totalTime += dt / this.skipRate;
    this.frame = this.from + Math.floor(this.totalTime / this.TPF);
    if (this.frame >= this.to - 1) {
      this.processEndFrame();
      return;
    }


    for (let morp of this.morps) {
      let target = morp.target;
      const t = (this.totalTime - ((this.frame - this.from) * this.TPF)) / this.TPF;
      var a = morp.frames[this.frame].attributes.position.array;
      var b = morp.frames[this.frame + 1].attributes.position.array;
      var points = new Float32Array(target.attributes.position.count * 3);
      for (var i = 0; i < target.attributes.position.count; i++) {
        points[i * 3] = a[i * 3] * (1 - t) + b[i * 3] * t;
        points[i * 3 + 1] = a[i * 3 + 1] * (1 - t) + b[i * 3 + 1] * t;
        points[i * 3 + 2] = a[i * 3 + 2] * (1 - t) + b[i * 3 + 2] * t;
      }
      target.setAttribute('position',
        new BufferAttribute(points, 3)
      )
    }

  }

  processEndFrame() {
    this.totalTime = 0;
  }
}


const anims: Map<string, MorphAnimation> = new Map();

const clock = new Clock()


export function Add(name: string, morps: MorphAnimation) {
  anims.set(name, morps);

}

export function Play(name: string, from: number, to: number) {

  var anim = anims.get(name);
  anim.from = from;
  anim.to = to;
  anim.state = 'play'

}

export function Update() {
  // TODO use GPU for performance
  const dt = clock.getDelta();

  for (var anim of anims.values()) {
    if (anim.state == 'play') {
      anim.update(dt)
    }
  }
}

export function processGLTF(gltf: GLTF) {

  gltf.scene.traverse(obj => {
    if (obj.userData['is_morph'] == true) {

      console.log('Loaded morph animation : ' + obj.name);

      var morps: Morp[] = [];
      for (let child of obj.children) {
        var frames = [];
        //(child as Mesh).geometry = new BufferGeometry();
        // Using draco makes object order non-stable
        child.children.sort((a, b) => a.name > b.name ? 1 : -1)
        for (let objFrame of child.children) {
          console.log(objFrame.name);
          
          objFrame.visible = false;
          frames.push((objFrame as Mesh).geometry);
        }



        morps.push({ target: (child as Mesh).geometry, frames })
      }

      Add(obj.name, new MorphAnimation(morps, 32, 7))
    }
  })
}