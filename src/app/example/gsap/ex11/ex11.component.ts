import {AfterViewInit, Component, OnInit} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

@Component({
  selector: 'app-ex11',
  templateUrl: './ex11.component.html',
  styleUrls: ['./ex11.component.scss']
})
export class Ex11Component implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger)

    /** 래퍼 */
    let container: any = document.getElementById('container');

    if (container) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical', // vertical, horizontal
        gestureDirection: 'vertical', // vertical, horizontal, both
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time: any) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      ScrollTrigger.create({
        trigger: '.section-1',
        start: 'top top',
        end: 'bottom top',
        pin: '.box',
      });
    }
  }

}
