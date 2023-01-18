import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

/** @description Geometry 파티클 */
@Component({
  selector: 'app-ex04',
  templateUrl: './ex04.component.html',
  styleUrls: ['./ex04.component.scss'],
})
export class Ex04Component implements OnInit {

  isOpen = true;

  constructor(
    private router: Router
  ) {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async ngOnInit(): Promise<void> {
    await this.example();
  }

  async example(): Promise<void> {
    const canvas = document.getElementById('three-canvas');

    if (!canvas) {
      throw new Error('example() :: The canvas was not found.');
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
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

    // Geometry
    const geometry = new THREE.BufferGeometry();
    const count = 10000;
    const colors = new Float32Array(count * 3);
    // xyz 포인트가 필요해서 count * 3
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3) // xyz 3개의 점
    );

    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );

    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('./assets/three/ex04/images/star.png');

    const material = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      alphaMap: particleTexture,
      depthWrite: false,
      vertexColors: true,
    });



    const particles = new THREE.Points(geometry, material);
    scene.add(particles);








    // Points
    // const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
    // const spherePositionArray = sphereGeometry.attributes?.['position'].array;
    // const randomPositionArray = [];
    //
    // for (let i = 0; i < spherePositionArray.length; i++) {
    //   randomPositionArray.push((Math.random() - 0.5) * 10);
    // }

    // Plane Mesh 여러개 생성
    // const imagePanels = [];
    //
    // let imagePanel;
    //
    // for (let i = 0; i < spherePositionArray?.length; i += 3) {
    //   imagePanel = new ImagePanel({
    //     textureLoader,
    //     scene,
    //     geometry: planeGeometry,
    //     imageSrc: `image/0${Math.ceil(Math.random() * 5)}.jpg`,
    //     x: spherePositionArray[i],
    //     y: spherePositionArray[i + 1],
    //     z: spherePositionArray[i + 2]
    //   });
    //
    //   imagePanels.push(imagePanel);
    // }

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

    // Controller
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-list');

    const moveButton = document.createElement('button');
    moveButton.setAttribute('dataset', 'page-move');
    moveButton.style.cssText = `position: absolute; left: 20px; top: 20px`;
    moveButton.innerHTML = `Page Move`;
    buttonWrapper.append(moveButton);

    document.body.append(buttonWrapper);

    // 이벤트
    window.addEventListener('resize', setSize);

    moveButton.addEventListener('click', () => {
      this.moveLink('/three/ex05');
    });

    draw();
  }

  moveLink(url: string): void {
    this.router.navigateByUrl(url).then();
  }

}
