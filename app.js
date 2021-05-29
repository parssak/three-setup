import * as THREE from 'three';

export default class Setup {
    constructor() {
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container = document.getElementById('container')
        this.container.appendChild(this.renderer.domElement)
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 1;

        // Recalibrates on resize
        window.addEventListener('resize', () => this._Resize())

        this.scene = new THREE.Scene();

        this.addMesh();
        this.Start();
    }

    addMesh() {
        this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        this.material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    _Resize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    Start() {
        this.renderer.render(this.scene, this.camera)
        this.renderer.setAnimationLoop(time => this.Update(time))
    }

    Update(time) {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera)
    }
}

new Setup();
