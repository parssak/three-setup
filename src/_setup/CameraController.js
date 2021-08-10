import * as THREE from 'three';
import oc from 'three-orbit-controls'
const OrbitControls = oc(THREE)

export default class CameraController {
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