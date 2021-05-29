import * as THREE from 'three';
import { Entity } from './setup'
class Cube extends Entity {
    constructor() {
        super();
    }

    BuildMesh() {
        this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    Start() {
        super.Start();
    }

    Update(time) {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.03;
        super.Update(time)
    }

    
}

new Cube();
