import * as THREE from 'three';

export default class Scene {
  constructor() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container = document.getElementById('container')
    this.container.appendChild(this.renderer.domElement)
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 1;

    // Recalibrates on resize
    window.addEventListener('resize', () => this._Resize())

    this.scene = new THREE.Scene();
  }


  _Resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  /**
   * Adds a new mesh to the scene.
   * @param {THREE.Mesh} mesh New Mesh to add to scene
   */
  Add(mesh) {
    console.log('adding mesh', mesh, 'to scene')
    this.scene.add(mesh)
  }
}

const scene = new Scene();

/**
 * Abstract Class Entity.
 *
 * @class Entity
 */
export class Entity {
  constructor() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
    this.renderer = scene.renderer;
    this.scene = scene;
    this.scene.renderer.render(this.scene.scene, this.scene.camera)
    this.scene.renderer.setAnimationLoop(time => this.Update(time))
    this.Start()
  }

  Start() {
    this.BuildMesh()
    this.scene.Add(this.mesh)
  }

  BuildMesh() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
  }

  Update(time) {
    this.renderer.render(this.scene.scene, this.scene.camera)
  }
}