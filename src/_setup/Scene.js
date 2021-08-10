import * as THREE from 'three';
import CameraController from './CameraController'
export default class Scene {
  entities = [];
  scene = new THREE.Scene();
  cameraController = new CameraController(this.scene);
  running = false;

  constructor() {
    this.SetupScene()
    this.Run();
  }

  /** Include any Scene setup logic here */
  SetupScene() {
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
    if (this.running)
      this.entities.forEach(entity => !entity.inGroup && entity.Update(time));
    this.cameraController.Update()
  }

  Run() {
    if (!this.running) {
      this.cameraController.renderer.setAnimationLoop(time => this.Update(time))
      this.running = true;
    }
  }

  Stop() {
    if (this.running) {
      this.running = false;
    }
  }
}