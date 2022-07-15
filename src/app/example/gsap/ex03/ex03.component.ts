import {AfterViewInit, Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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

    gsap.registerPlugin(ScrollTrigger)

    let container: any = document.getElementById('container');

    if (container) {
      // horizontal scroll container
      gsap.to(container, {
        x: () => -(container.scrollWidth - document.documentElement.clientWidth) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          invalidateOnRefresh: true,
          pin: true,
          scrub: 1,
          markers: true,
          end: () => '+=' + container.offsetWidth
        }
      });
    }

  }

}
