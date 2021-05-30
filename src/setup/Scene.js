import * as THREE from 'three';
import CameraController from './CameraController'

export default class Scene {
  constructor() {
    // All Entities in Scene
    this.entities = [];

    // Scene
    this.scene = new THREE.Scene();

    // Camera Controller
    this.cameraController = new CameraController(this.scene);

    this.SetupScene()

    // Run the Update loop
    this.cameraController.renderer.setAnimationLoop(time => this.Update(time))
  }

  /** Include any Scene setup logic here */
  SetupScene() {
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