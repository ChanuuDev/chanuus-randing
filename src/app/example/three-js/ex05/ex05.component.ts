import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import {ImagePanel} from './image-panel';

@Component({
  selector: 'app-ex05',
  templateUrl: './ex05.component.html',
  styleUrls: ['./ex05.component.scss']
})
export class Ex05Component implements OnInit {

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    await this.example();
  }

  async example(): Promise<void> {
    const canvas = document.getElementById('three-canvas');

    if (!canvas) {
      console.error('canvas was not found!');
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // device dpi
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1.5;
    camera.position.z = 4;
    scene.add(camera);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff , 0.5);
    scene.add(ambientLight);

    // Lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Mesh
    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.3),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
    );

    // Points
    const sphereGeometry = new THREE.SphereGeometry(1, 8, 1);
    const positionArray = sphereGeometry.getAttribute('position').array;

    for (let i = 0; i < positionArray.length; i += 3) {
      let plane = planeMesh.clone();
      plane.position.x = positionArray[i];
      plane.position.y = positionArray[i + 1];
      plane.position.z = positionArray[i + 2];
      plane.lookAt(0, 0, 0);
      scene.add(plane);
    }

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();

      controls.update();

      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener('resize', setSize);

    draw();
  }

}
