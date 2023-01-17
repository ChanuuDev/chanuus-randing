import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GUI } from 'lil-gui';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

@Component({
  selector: 'app-ex03',
  templateUrl: './ex03.component.html',
  styleUrls: ['./ex03.component.scss']
})
export class Ex03Component implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const container = document.querySelector('.container');
    const boxCanvas = document.querySelector('#box-canvas');

    let box = {
      params: {
        width: 27,
        widthLimits: [15, 70],
        length: 80,
        lengthLimits: [70, 120],
        depth: 45,
        depthLimits: [15, 70],
        thickness: .6,
        thicknessLimits: [.1, 1],
        fluteFreq: 5,
        fluteFreqLimits: [3, 7],
        flapGap: 1,
        copyrightSize: [15, 5]
      },
      els: {
        group: new THREE.Group(),
        backHalf: {
          width: {
            top: new THREE.Mesh(),
            side: new THREE.Mesh(),
            bottom: new THREE.Mesh(),
          },
          length: {
            top: new THREE.Mesh(),
            side: new THREE.Mesh(),
            bottom: new THREE.Mesh(),
          },
        },
        frontHalf: {
          width: {
            top: new THREE.Mesh(),
            side: new THREE.Mesh(),
            bottom: new THREE.Mesh(),
          },
          length: {
            top: new THREE.Mesh(),
            side: new THREE.Mesh(),
            bottom: new THREE.Mesh(),
          },
        }
      },
      animated: {
        openingAngle: .02 * Math.PI,
        flapAngles: {
          backHalf: {
            width: {
              top: 0,
              bottom: 0
            },
            length: {
              top: 0,
              bottom: 0
            },
          },
          frontHalf: {
            width: {
              top: 0,
              bottom: 0
            },
            length: {
              top: 0,
              bottom: 0
            },
          }
        }
      }
    };

    // Globals
    // @ts-ignore
    let renderer, scene, camera, orbit, lightHolder, rayCaster, mouse, copyright;

    // Run the app
    initScene();
    createControlPanel();
    window.addEventListener('resize', updateSceneSize);

    // run the animation automatically on start
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    gsap.to(window, {
      duration: 1.5,
      scrollTo: window.innerHeight,
      ease: 'power1.inOut'
    });

    // Three.js scene
    function initScene() {

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        // @ts-ignore
        canvas: boxCanvas
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene = new THREE.Scene();
      // @ts-ignore
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 10, 1000);
      camera.position.set(40, 90, 110);

      rayCaster = new THREE.Raycaster();
      mouse = new THREE.Vector2(0, 0);

      updateSceneSize();

      scene.add(box.els.group);
      setGeometryHierarchy();

      const ambientLight = new THREE.AmbientLight(0xffffff, .5);
      scene.add(ambientLight);
      lightHolder = new THREE.Group();
      const topLight = new THREE.PointLight(0xffffff, .5);
      topLight.position.set(-30, 300, 0);
      lightHolder.add(topLight);
      const sideLight = new THREE.PointLight(0xffffff, .7);
      sideLight.position.set(50, 0, 150);
      lightHolder.add(sideLight);
      scene.add(lightHolder);

      scene.add(box.els.group);
      setGeometryHierarchy();

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x9C8D7B),
        side: THREE.DoubleSide
      });

      box.els.group.traverse(c => {
        // @ts-ignore
        if (c.isMesh) { c.material = material; }
      });

      // @ts-ignore
      orbit = new OrbitControls(camera, boxCanvas);
      orbit.enableZoom = false;
      orbit.enablePan = false;
      orbit.enableDamping = true;
      orbit.autoRotate = true;
      orbit.autoRotateSpeed = .5;

      createCopyright();
      createBoxElements();
      createZooming();
      createFoldingAnimation();

      draw();
    }

    /* 재귀 */
    function draw() {
      // @ts-ignore
      orbit.update();

      // @ts-ignore
      lightHolder.quaternion.copy(camera.quaternion);

      // @ts-ignore
      renderer.render(scene, camera);
      requestAnimationFrame(draw);
    }


    function updateSceneSize() {
      // @ts-ignore
      camera.aspect = container.clientWidth / container.clientHeight;

      // @ts-ignore
      camera.updateProjectionMatrix();

      // @ts-ignore
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    // End of Three.js scene

    // Box geometries
    function setGeometryHierarchy() {
      box.els.group.add(box.els.frontHalf.width.side, box.els.frontHalf.length.side, box.els.backHalf.width.side, box.els.backHalf.length.side);
      box.els.frontHalf.width.side.add(box.els.frontHalf.width.top, box.els.frontHalf.width.bottom);
      box.els.frontHalf.length.side.add(box.els.frontHalf.length.top, box.els.frontHalf.length.bottom);
      box.els.backHalf.width.side.add(box.els.backHalf.width.top, box.els.backHalf.width.bottom);
      box.els.backHalf.length.side.add(box.els.backHalf.length.top, box.els.backHalf.length.bottom);
    }

    function createBoxElements() {
      for (let halfIdx = 0; halfIdx < 2; halfIdx++) {
        for (let sideIdx = 0; sideIdx < 2; sideIdx++) {

          const half = halfIdx ? 'frontHalf' : 'backHalf';
          const side = sideIdx ? 'width' : 'length';

          const sideWidth = side === 'width' ? box.params.width : box.params.length;
          const flapWidth = sideWidth - 2 * box.params.flapGap;
          const flapHeight = .5 * box.params.width - .75 * box.params.flapGap;

          const sidePlaneGeometry = new THREE.PlaneGeometry(
            sideWidth,
            box.params.depth,
            Math.floor(5 * sideWidth),
            Math.floor(.2 * box.params.depth)
          );
          const flapPlaneGeometry = new THREE.PlaneGeometry(
            flapWidth,
            flapHeight,
            Math.floor(5 * flapWidth),
            Math.floor(.2 * flapHeight)
          );

          const sideGeometry = createSideGeometry(
            sidePlaneGeometry,
            [sideWidth, box.params.depth],
            [true, true, true, true],
            false
          );
          const topGeometry = createSideGeometry(
            flapPlaneGeometry,
            [flapWidth, flapHeight],
            [false, false, true, false],
            true
          );
          const bottomGeometry = createSideGeometry(
            flapPlaneGeometry,
            [flapWidth, flapHeight],
            [true, false, false, false],
            true
          );

          topGeometry.translate(0, .5 * flapHeight, 0);
          bottomGeometry.translate(0, -.5 * flapHeight, 0);

          box.els[half][side].top.geometry = topGeometry;
          box.els[half][side].side.geometry = sideGeometry;
          box.els[half][side].bottom.geometry = bottomGeometry;

          box.els[half][side].top.position.y = .5 * box.params.depth;
          box.els[half][side].bottom.position.y = -.5 * box.params.depth;
        }
      }

      updatePanelsTransform();
    }

    // @ts-ignore
    function createSideGeometry(baseGeometry, size, folds, hasMiddleLayer) {
      const geometriesToMerge = [];
      // @ts-ignore
      geometriesToMerge.push(getLayerGeometry(v =>
        -.5 * box.params.thickness + .01 * Math.sin(box.params.fluteFreq * v)
      ));
      // @ts-ignore
      geometriesToMerge.push(getLayerGeometry(v =>
        .5 * box.params.thickness + .01 * Math.sin(box.params.fluteFreq * v)
      ));
      if (hasMiddleLayer) {
        // @ts-ignore
        geometriesToMerge.push(getLayerGeometry(v =>
          .5 * box.params.thickness * Math.sin(box.params.fluteFreq * v)
        ));
      }

      // @ts-ignore
      function getLayerGeometry(offset) {
        const layerGeometry = baseGeometry.clone();
        const positionAttr = layerGeometry.attributes.position;
        for (let i = 0; i < positionAttr.count; i++) {
          const x = positionAttr.getX(i);
          const y = positionAttr.getY(i)
          let z = positionAttr.getZ(i) + offset(x);
          z = applyFolds(x, y, z);
          positionAttr.setXYZ(i, x, y, z);
        }
        return layerGeometry;
      }

      // @ts-ignore
      function applyFolds(x, y, z) {
        // @ts-ignore
        let modifier = (c, s) => (1. - Math.pow(c / (.5 * s), 10.));
        if ((x > 0 && folds[1]) || (x < 0 && folds[3])) {
          z *= modifier(x, size[0]);
        }
        if ((y > 0 && folds[0]) || (y < 0 && folds[2])) {
          z *= modifier(y, size[1]);
        }
        return z;
      }

      // @ts-ignore
      const mergedGeometry = new mergeBufferGeometries(geometriesToMerge, false);
      mergedGeometry.computeVertexNormals();

      return mergedGeometry;
    }
    // End of box geometries
    // --------------------------------------------------

    // --------------------------------------------------
    // Clickable copyright
    function createCopyright() {
      const canvas = document.createElement('canvas');
      canvas.width = box.params.copyrightSize[0] * 10;
      canvas.height = box.params.copyrightSize[1] * 10;
      const planeGeometry = new THREE.PlaneGeometry(box.params.copyrightSize[0], box.params.copyrightSize[1]);

      const ctx = canvas.getContext('2d');
      // @ts-ignore
      ctx.clearRect(0, 0, canvas.width, canvas.width);
      // @ts-ignore
      ctx.fillStyle = '#000000';
      // @ts-ignore
      ctx.font = '22px sans-serif';
      // @ts-ignore
      ctx.fillText('chanuus.com', canvas.width - 150, 30);

      // @ts-ignore
      ctx.lineWidth = 2;
      // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.moveTo(canvas.width - 170, 35);
      // @ts-ignore
      ctx.lineTo(canvas.width - 20, 35);
      // @ts-ignore
      ctx.stroke();

      const texture = new THREE.CanvasTexture(canvas);
      copyright = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      }));

      // @ts-ignore
      scene.add(copyright);
      trackLinks();
    }

    function trackLinks() {
      document.addEventListener('mousemove', (e) => {
        updateMousePosition(e.clientX, e.clientY);
        checkCopyrightIntersect();
      }, false);
      document.addEventListener('click', (e) => {
        updateMousePosition(
          // @ts-ignore
          e.targetTouches ? e.targetTouches[0].pageX : e.clientX, e.targetTouches ? e.targetTouches[0].pageY : e.clientY
        );
        if (checkCopyrightIntersect()) {
          // @ts-ignore
          window.open('https://chanuus.com/', '_blank').focus();
        }
      });

      // @ts-ignore
      function updateMousePosition(x, y) {
        // @ts-ignore
        mouse.x = x / window.innerWidth * 2 - 1;

        // @ts-ignore
        mouse.y = -y / window.innerHeight * 2 + 1;
      }
    }

    function checkCopyrightIntersect() {
      let linkHovered = false;
      // @ts-ignore
      rayCaster.setFromCamera(mouse, camera);
      // @ts-ignore
      const intersects = rayCaster.intersectObject(copyright);
      if (intersects.length) {
        document.body.style.cursor = 'pointer';
        linkHovered = true;
      } else {
        document.body.style.cursor = 'auto';
      }
      return linkHovered;
    }
    // End of Clickable copyright
    // --------------------------------------------------

    // --------------------------------------------------
    // Animation
    function createFoldingAnimation() {
      gsap.timeline({
        scrollTrigger: {
          id: 'st',
          trigger: '.page',
          start: '0% 0%',
          end: '100% 100%',
          scrub: true
        },
        onUpdate: () => {
          updatePanelsTransform();
          checkCopyrightIntersect();
        }
      })
        .to(box.animated, {
          duration: 1,
          openingAngle: .5 * Math.PI,
          ease: 'power1.inOut'
        })
        .to([box.animated.flapAngles.backHalf.width, box.animated.flapAngles.frontHalf.width], {
          duration: .6,
          bottom: .6 * Math.PI,
          ease: 'back.in(3)'
        }, .9)
        .to(box.animated.flapAngles.backHalf.length, {
          duration: .7,
          bottom: .5 * Math.PI,
          ease: 'back.in(2)'
        }, 1.1)
        .to(box.animated.flapAngles.frontHalf.length, {
          duration: .8,
          bottom: .49 * Math.PI,
          ease: 'back.in(3)'
        }, 1.4)
        .to([box.animated.flapAngles.backHalf.width, box.animated.flapAngles.frontHalf.width], {
          duration: .6,
          top: .6 * Math.PI,
          ease: 'back.in(3)'
        }, 1.4)
        .to(box.animated.flapAngles.backHalf.length, {
          duration: .7,
          top: .5 * Math.PI,
          ease: 'back.in(3)'
        }, 1.7)
        .to(box.animated.flapAngles.frontHalf.length, {
          duration: .9,
          top: .49 * Math.PI,
          ease: 'back.in(4)'
        }, 1.8);
    }

    function updatePanelsTransform() {
      // place width-sides aside of length-sides (not animated)
      box.els.frontHalf.width.side.position.x = .5 * box.params.length;
      box.els.backHalf.width.side.position.x = -.5 * box.params.length;

      // rotate width-sides from 0 to 90 deg
      box.els.frontHalf.width.side.rotation.y = box.animated.openingAngle;
      box.els.backHalf.width.side.rotation.y = box.animated.openingAngle;

      // move length-sides to keep the box centered
      const cos = Math.cos(box.animated.openingAngle); // animates from 1 to 0
      box.els.frontHalf.length.side.position.x = -.5 * cos * box.params.width;
      box.els.backHalf.length.side.position.x = .5 * cos * box.params.width;

      // move length-sides to define box inner space
      const sin = Math.sin(box.animated.openingAngle); // animates from 0 to 1
      box.els.frontHalf.length.side.position.z = .5 * sin * box.params.width;
      box.els.backHalf.length.side.position.z = -.5 * sin * box.params.width;

      box.els.frontHalf.width.top.rotation.x = -box.animated.flapAngles.frontHalf.width.top;
      box.els.frontHalf.length.top.rotation.x = -box.animated.flapAngles.frontHalf.length.top;
      box.els.frontHalf.width.bottom.rotation.x = box.animated.flapAngles.frontHalf.width.bottom;
      box.els.frontHalf.length.bottom.rotation.x = box.animated.flapAngles.frontHalf.length.bottom;

      box.els.backHalf.width.top.rotation.x = box.animated.flapAngles.backHalf.width.top;
      box.els.backHalf.length.top.rotation.x = box.animated.flapAngles.backHalf.length.top;
      box.els.backHalf.width.bottom.rotation.x = -box.animated.flapAngles.backHalf.width.bottom;
      box.els.backHalf.length.bottom.rotation.x = -box.animated.flapAngles.backHalf.length.bottom;

      // @ts-ignore
      copyright.position.copy(box.els.frontHalf.length.side.position);
      // @ts-ignore
      copyright.position.x += .5 * box.params.length - .5 * box.params.copyrightSize[0];
      // @ts-ignore
      copyright.position.y -= .5 * (box.params.depth - box.params.copyrightSize[1]);
      // @ts-ignore
      copyright.position.z += box.params.thickness;
    }
    // End of animation
    // --------------------------------------------------


    // --------------------------------------------------
    // Manual zoom (buttons only since the scroll is used by folding animation)
    function createZooming() {
      const zoomInBtn = document.querySelector('#zoom-in');
      const zoomOutBtn = document.querySelector('#zoom-out');

      let zoomLevel = 1;
      const limits = [.4, 2];

      // @ts-ignore
      zoomInBtn.addEventListener('click', () => {
        zoomLevel *= 1.3;
        applyZoomLimits();
      });

      // @ts-ignore
      zoomOutBtn.addEventListener('click', () => {
        zoomLevel *= .75;
        applyZoomLimits();
      });

      function applyZoomLimits() {
        if (zoomLevel > limits[1]) {
          zoomLevel = limits[1];
          // @ts-ignore
          zoomInBtn.classList.add('disabled');
        } else if (zoomLevel < limits[0]) {
          zoomLevel = limits[0];
          // @ts-ignore
          zoomOutBtn.classList.add('disabled');
        } else {
          // @ts-ignore
          zoomInBtn.classList.remove('disabled');
          // @ts-ignore
          zoomOutBtn.classList.remove('disabled');
        }
        // @ts-ignore
        gsap.to(camera, {
          duration: .2,
          zoom: zoomLevel,
          onUpdate: () => {
            // @ts-ignore
            camera.updateProjectionMatrix();
          }
        })
      }
    }
    // End of Manual zoom
    // --------------------------------------------------

    // --------------------------------------------------
    // Range sliders for box parameters
    function createControlPanel() {
      const gui = new GUI();
      gui.add(box.params, 'width', box.params.widthLimits[0], box.params.widthLimits[1]).step(1).onChange(() => {
        createBoxElements();
        updatePanelsTransform();
      });
      gui.add(box.params, 'length', box.params.lengthLimits[0], box.params.lengthLimits[1]).step(1).onChange(() => {
        createBoxElements();
        updatePanelsTransform();
      });
      gui.add(box.params, 'depth', box.params.depthLimits[0], box.params.depthLimits[1]).step(1).onChange(() => {
        createBoxElements();
        updatePanelsTransform();
      });
      gui.add(box.params, 'fluteFreq', box.params.fluteFreqLimits[0], box.params.fluteFreqLimits[1]).step(1).onChange(() => {
        createBoxElements();
      }).name('flute');
      gui.add(box.params, 'thickness', box.params.thicknessLimits[0], box.params.thicknessLimits[1]).step(.05).onChange(() => {
        createBoxElements();
      });
    }
  }

}
