import * as THREE from 'three';
import oc from 'three-orbit-controls'
const OrbitControls = oc(THREE)
import { v4 as uuidv4 } from 'uuid';

/**
 * -  THREE-SETUP -
 * 
 * An Object-Oriented setup for three.js
 * 
 * By Parssa Kyanzadeh
 * www.parssak.com
 */

class CameraController {
  constructor(scene) {
    this.scene = scene;

    // -- Camera Settings -- 
    this.fov = 45;
    this.near = 0.01;
    this.far = 20000;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Container
    this.container = document.getElementById('container')
    this.container.appendChild(this.renderer.domElement)

    // Set up Camera
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);

    // Set up Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Optional Controls Settings
    this.controls.autoRotate = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.39;
    this.camera.position.z = 200;

    this.controls.update();

    // Recalibrates on resize
    window.addEventListener('resize', () => this._Resize())
  }

  Update() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  _Resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}
class Scene {
  constructor() {
    // All Entities in Scene
    this.entities = [];

    // Scene
    this.scene = new THREE.Scene();

    // Camera Controller
    this.cameraController = new CameraController(this.scene);

    const ambientLight = new THREE.AmbientLight(0x041f60);
    ambientLight.intensity = 0.3;
    this.scene.add(ambientLight);
    this.scene.fog = new THREE.Fog(0x041f60, 3000, 20000);

    // Run the Update loop
    this.cameraController.renderer.setAnimationLoop(time => this.Update(time))
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

  /**
   * Runs once per frame, call's Update for each entity
   * @param {float} time Time since the Scene began
   */
  Update(time) {
    this.entities.forEach(entity => !entity.inGroup && entity.Update(time));
    this.cameraController.Update()
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
  }


  // Called every frame
  Update(time) {
  }
}