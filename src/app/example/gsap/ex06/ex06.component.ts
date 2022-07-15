import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ex06',
  templateUrl: './ex06.component.html',
  styleUrls: ['./ex06.component.scss']
})
export class Ex06Component implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    const h1 = document.querySelector('h1')
    this.glitch(h1);
  }

  glitch(element: any) {
    let count = 0
    setInterval(() => {
      // element
      const skew = Math.random() * 20 - 10

      // element::before
      const top1 = Math.random() * 100
      const btm1 = Math.random() * 100

      // element::after
      const top2 = Math.random() * 100
      const btm2 = Math.random() * 100

      element.style.setProperty('--skew', `${skew}deg`)
      element.style.setProperty('--t1', `${top1}%`)
      element.style.setProperty('--b1', `${btm1}%`)
      element.style.setProperty('--t2', `${top2}%`)
      element.style.setProperty('--b2', `${btm2}%`)
      element.style.setProperty('--scale', `1`)

      count++

      if (count % 15 === 0) {
        const bigSkew = Math.random() * 180 - 90
        element.style.setProperty('--skew', `${bigSkew}deg`)
      }

      if (count % 30 === 0) {
        const bigScale = 1 + (Math.random() / 2)
        element.style.setProperty('--scale', `${bigScale}`)
      }
    }, 100)
  }



}
