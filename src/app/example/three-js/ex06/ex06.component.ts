import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-ex06',
  templateUrl: './ex06.component.html',
  styleUrls: ['./ex06.component.scss']
})
export class Ex06Component implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.run();
  }

  ngOnInit(): void {
  }

  run(): void {
    // Canvas
    const canvas = document.getElementById('three-canvas-06');

    if (!canvas) {
      console.error('canvas was not found!!');
      return;
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    if (!renderer) {
      console.error('renderer was now found!!');
      return;
    }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000);

    camera.position.y = 1.5;
    camera.position.z = 4;
    scene.add(camera);


    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    scene.add(directionalLight);

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 'seagreen' });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    function draw() {
      const clock = new THREE.Clock(); // 보정
      renderer.render(scene, camera); // 데이터 속성
      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
      setSize();
    });

    setSize();
    draw();

  }
}
