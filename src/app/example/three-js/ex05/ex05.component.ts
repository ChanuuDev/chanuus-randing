import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {ImagePanel} from './image-panel';
import gsap from 'gsap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ex05',
  templateUrl: './ex05.component.html',
  styleUrls: ['./ex05.component.scss']
})
export class Ex05Component implements OnInit {

  constructor(
    private router: Router,
  ) {
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

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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

    // Mesh
    const planeGeometry = new THREE.PlaneGeometry(0.3, 0.3);

    // textureLoader
    const textureLoader = new THREE.TextureLoader();

    // Points
    const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
    const spherePositionArray: any = sphereGeometry.getAttribute('position').array;
    let randomPositionArray: any[] = [];

    for (let i = 0; i < spherePositionArray.length; i++) {
      randomPositionArray.push((Math.random() - 0.5) * 7);
    }

    // 여러개의 Plane Mesh 생성
    let imagePanels: any[] = [];
    let imagePanel;
    for (let i = 0; i < spherePositionArray.length; i += 3) {
      imagePanel = new ImagePanel({
        textureLoader,
        scene,
        geometry: planeGeometry,
        imageSrc: `./assets/three/ex05/images/0${Math.ceil(Math.random() * 5)}.jpg`,
        x: spherePositionArray[i],
        y: spherePositionArray[i + 1],
        z: spherePositionArray[i + 2],
      });

      imagePanels.push(imagePanel);
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

    function setShape(event: any) {
      const type = event.target.getAttribute('dataset');
      let shapes: any[] = [];

      switch (type) {
        case 'random':
          shapes = randomPositionArray;
          break;
        case 'sphere':
          shapes = spherePositionArray;
          break;
      }

      for (let i = 0; i < imagePanels.length; i++) {
        // gsap로 위치 이동
        gsap.to(
          imagePanels[i].mesh.position,
          {
            duration: 2,
            x: shapes[i * 3],
            y: shapes[i * 3 + 1],
            z: shapes[i * 3 + 2]
          }
        );

        // 회전
        if (type === 'random') {
          gsap.to(
            imagePanels[i].mesh.rotation,
            {
              duration: 2,
              x: 0,
              y: 0,
              z: 0
            }
          );
        } else if (type === 'sphere') {
          gsap.to(
            imagePanels[i].mesh.rotation,
            {
              duration: 2,
              x: imagePanels[i].sphereRotationX,
              y: imagePanels[i].sphereRotationY,
              z: imagePanels[i].sphereRotationZ
            }
          );
        }
      }
    }

    // Controller
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-list');

    const randomButton = document.createElement('button');
    randomButton.setAttribute('dataset', 'random');
    randomButton.style.cssText = `position: absolute; left: 20px; top: 20px`;
    randomButton.innerHTML = `Random`;
    buttonWrapper.append(randomButton);

    const sphereButton = document.createElement('button');
    sphereButton.setAttribute('dataset', 'sphere');
    sphereButton.style.cssText = `position: absolute; left: 20px; top: 50px`;
    sphereButton.innerHTML = `Sphere`;
    buttonWrapper.append(sphereButton);

    document.body.append(buttonWrapper);

    // 이벤트
    buttonWrapper.addEventListener('click', setShape);
    window.addEventListener('resize', setSize)

    draw();
  }

  moveLink(url: string): void {
    this.router.navigateByUrl(url).then();
  }

}
