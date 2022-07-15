import {AfterViewInit, Component, OnInit} from '@angular/core';
import { gsap, Elastic } from 'gsap';

@Component({
  selector: 'app-ex05',
  templateUrl: './ex05.component.html',
  styleUrls: ['./ex05.component.scss']
})
export class Ex05Component implements OnInit, AfterViewInit {

  constructor() { }

  async ngAfterViewInit(): Promise<void> {
    const a = document.querySelector('a');
    this.magneticButton(a)
  }

  ngOnInit(): void {
  }

  dragMagneticButton(event: DragEvent) {
    // console.log('event : ', event.target);
    this.dragButton(event.target, event)
  }

  dragButton(element: any, event: DragEvent) {
    const children = element.children[0];

    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = element
    const left = event.pageX - offsetLeft
    const top = event.pageY - offsetTop
    const centerX = left - offsetWidth / 2
    const centerY = top - offsetHeight / 2
    const d = Math.sqrt(centerX**2 + centerY**2)

    gsap.to(element, 0.5, {
      x: centerX / 1.5,
      y: centerY / 1.5,
      ease: Elastic.easeOut
    })

    children.style.transform = `
      translate3d(${centerX / 4}px, ${centerY / 4}px, 0)
      rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg)
    `
  }

  dragEnd(event: any) {
    console.log('dragEnd : ', event);

    const children = event.target.children[0];

    gsap.to(event.target, 1.2, {
      x: 0,
      y: 0,
      ease: Elastic.easeOut.config(1, 0.1)
    })
    children.style.transform = ''

  }

  magneticButton(element: any) {
    const children = element.children[0]

    element.addEventListener('mousemove', (e: any) => {

      console.log('mousevouew : ', e);

      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = element
      const left = e.pageX - offsetLeft
      const top = e.pageY - offsetTop
      const centerX = left - offsetWidth / 2
      const centerY = top - offsetHeight / 2
      const d = Math.sqrt(centerX**2 + centerY**2)

      gsap.to(element, 0.5, {
        x: centerX / 1.5,
        y: centerY / 1.5,
        ease: Elastic.easeOut
      })

      children.style.transform = `
      translate3d(${centerX / 4}px, ${centerY / 4}px, 0)
      rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg)
    `
    })

    element.addEventListener('mouseleave', () => {
      gsap.to(element, 1.2, {
        x: 0,
        y: 0,
        ease: Elastic.easeOut.config(1, 0.1)
      })
      children.style.transform = ''
    })
  }

}
