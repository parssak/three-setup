import * as THREE from 'three';
import { Entity } from './setup'

const getRandomNum = (max = 0, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min;

class Agent extends Entity {
    constructor() {
        super(true);
        this.velocity = new THREE.Vector3(getRandomNum(100, -100) * 0.1, getRandomNum(100, -100) * 0.1, getRandomNum(100, -100) * 0.1);
        this.acceleration = new THREE.Vector3();
        this.wonderTheta = 0;
        this.maxSpeed = 2;
        this.boost = new THREE.Vector3();
    }

    Start() {
        super.Start();
        const radius = getRandomNum(0, 100);
        const theta = THREE.Math.degToRad(getRandomNum(180));
        const phi = THREE.Math.degToRad(getRandomNum(360));
        this.mesh.position.x = Math.sin(theta) * Math.cos(phi) * radius;
        this.mesh.position.y = Math.sin(theta) * Math.sin(phi) * radius;
        this.mesh.position.z = Math.cos(theta) * radius;
    }

    Update(time) {
        console.log('my update ran', this.id)
        const maxSpeed = this.maxSpeed;

        // boost
        this.ApplyForce(this.boost);
        this.boost.multiplyScalar(0.9);
        if (this.boost.length() < 0.01) {
            this.boost = new THREE.Vector3();
        }

        // update velocity
        this.velocity.add(this.acceleration);

        // limit velocity
        if (this.velocity.length() > maxSpeed) {
            this.velocity.clampLength(0, maxSpeed);
        }

        // update position
        this.mesh.position.add(this.velocity);

        // reset acc
        this.acceleration.multiplyScalar(0);

        // head
        const head = this.velocity.clone();
        head.multiplyScalar(10);
        head.add(this.mesh.position);
        this.mesh.lookAt(head);

        super.Update(time)
    }

    BuildMesh() {
        this.geometry = new THREE.CylinderGeometry(0, 1, 2, 20);
        this.geometry.rotateX(THREE.Math.degToRad(90))
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }


    ApplyForce(f) {
        this.acceleration.add(f.clone());
    }

}


class Boid extends Entity {
    constructor() {
        super();
        this.count = 10;
    }

    Start() {
        super.Start();
    }

    BuildMesh() {
        this.group = new THREE.Group();
        this.agents = [];

        for (let i = 0; i < 10; i++) {
            const agent = new Agent();
            this.group.add(agent.mesh);
            this.agents.push(agent);
        }
    }
}


new Boid();