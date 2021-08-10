import Entity from '../_setup'

export default class Agent extends Entity {
  constructor() {
    super();
  }

  BuildMesh() {
    this.geometry = new THREE.CylinderGeometry(0, 4, 8, 10);
    this.geometry.rotateX(THREE.Math.degToRad(90));
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  Start() {
    super.Start();
  }

  Update(time) {
    this.mesh.rotation.x += 0.03;
    this.mesh.rotation.y += 0.03;
  }
}