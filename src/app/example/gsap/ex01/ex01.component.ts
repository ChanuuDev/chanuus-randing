import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit, AfterViewInit {

  smoother: any;

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  }

  ngAfterViewInit(): void {
    this.smoother = ScrollSmoother.create({
      wrapper: '#section-wrap',
      content: '#section-content',
      smooth: 3,
      effects: true
    });

  }

  moveTop(): void {
  }

  initScrollTriggers() {
    document.querySelectorAll(".box").forEach(box => {
      const scrollBox = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          pin: true,
          start: "top top",
          end: "bottom bottom",
          markers: true,
          toggleActions: "play none none reverse"
        }
      });
      scrollBox.from(box, { y: 30, opacity: 0 });
    });
  }

  clickTest(): void {
    this.smoother.scrollTo("#gsap-section-05", true, "center center");

  }

}
