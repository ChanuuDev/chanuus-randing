import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit, AfterViewInit {

  @ViewChild('threeCanvas') threeCanvasEl: ElementRef | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.animateSampleRect();
    // this.sampleEx01();
  }

  sampleEx01(): void {
    const canvas = this.threeCanvasEl?.nativeElement;

    if (!canvas) {
      throw new Error('canvas is not available !!!');
    }

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animateSampleRect(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const canvas = this.threeCanvasEl?.nativeElement;

    if (canvas) {
      // renderer
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // geometry 물체 크기
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      // material 재질
      const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      const material2 = new THREE.MeshBasicMaterial({color: '#ff0000'});

      // 객체
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const cube2 = new THREE.Mesh(geometry, material2);
      // scene.add(cube2);

      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      camera.position.z = 5;
      renderer.render(scene, camera);
      animate();
    }

    // tangent => 접선에 수직인 직선 => Normal[법선]
    // tangential
    // tangential line

  }


}
