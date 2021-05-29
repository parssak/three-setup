import * as THREE from 'three';
import { Entity } from './setup'
class Cube extends Entity {
    constructor() {
        super();
    }

    Start() {
        super.Start();
    }

    BuildMesh() {
        this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

new Cube();
