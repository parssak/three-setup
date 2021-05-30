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

    // Renderer
    this.AddRenderer()

    // Set up Camera
    this.AddCamera();

    // Set up Controls
    this.AddControls();

    // Recalibrates on resize
    window.addEventListener('resize', () => this.HandleResize())
  }

  /** Initializes Renderer and appends 
   *  it to the #container element.
  */
  AddRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container = document.getElementById('container')
    this.container.appendChild(this.renderer.domElement)
  }

  /** Initializes Camera */
  AddCamera() {
    this.fov = 45;
    this.near = 0.01;
    this.far = 20000;

    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);
  }

  /** Initializes Controls */
  AddControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.autoRotate = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.39;
    this.camera.position.z = 200;

    this.controls.update();
  }

  /** Handles recalibrating the camera when
   *  the window is resized.
   */
  HandleResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  /** Updates the controls, and re-renders everything.
   *  Note: This is called by the Scene update loop externally.
   */
  Update() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
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

    this.Setup()

    // Run the Update loop
    this.cameraController.renderer.setAnimationLoop(time => this.Update(time))
  }

  /** Include any Scene setup logic here */
  Setup() {
    const ambientLight = new THREE.AmbientLight(0x041f60);
    ambientLight.intensity = 0.3;
    this.scene.add(ambientLight);
    this.scene.fog = new THREE.Fog(0x041f60, 3000, 20000);
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
export default class Entity {
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