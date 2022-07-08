import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss']
})
export class Ex02Component implements OnInit, AfterViewInit {

  @ViewChild('threeCanvas') threeCanvasEl: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.animateExample();
    this.animateSampleRect();
  }

  animateExample(): void {
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
      scene.add(cube2);

      const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };
      camera.position.z = 5;
      renderer.render(scene, camera);
      animate();
    }

  }

}
