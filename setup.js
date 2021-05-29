import * as THREE from 'three';
import oc from 'three-orbit-controls'
const OrbitControls = oc(THREE)
import { v4 as uuidv4 } from 'uuid';


export default class Scene {
  constructor() {
    this.entities = [];

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container = document.getElementById('container')
    this.container.appendChild(this.renderer.domElement)
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 20000);
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.39;
    this.camera.position.z = 200;
    this.controls.update();
    // Recalibrates on resize
    window.addEventListener('resize', () => this._Resize())

    this.scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0x041f60);
    ambientLight.intensity = 0.3;
    this.scene.add(ambientLight);
    this.scene.fog = new THREE.Fog(0x041f60, 3000, 20000);


    this.renderer.setAnimationLoop(time => this.Update(time))
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
  Add(entity) {
    if (entity.mesh) {
      this.scene.add(entity.mesh)
      this.entities.push(entity)
    }
    else if (entity.group) {
      this.scene.add(entity.group)
      this.entities.push(entity)
    }
  }

  Update(time) {
    this.controls.update()
    this.entities.forEach(entity => !entity.inGroup && entity.Update(time));
    this.renderer.render(this.scene, this.camera);
  }
}

export const scene = new Scene();

/**
 * Abstract Class Entity.
 *
 * @class Entity
 */
export class Entity {
  constructor(inGroup = false) {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
    this.renderer = scene.renderer;
    
    this.id = uuidv4();
    this.scene = scene;
    this.inGroup = inGroup;
    
    this.Start()
  }

  // Use this to define the mesh of the Entity
  BuildMesh() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
  }

  // Called once on initialization
  Start() {
    this.BuildMesh()
    this.scene.Add(this)
    this.renderer.render(this.scene.scene, this.scene.camera)
  }

  
  // Called every frame
  Update(time) {
    this.renderer.render(this.scene.scene, this.scene.camera)
  }
}