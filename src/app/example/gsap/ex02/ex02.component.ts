import {AfterViewInit, Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss']
})
export class Ex02Component implements OnInit, AfterViewInit {

  container: any;
  height: any;

  constructor() { }

  ngOnInit(): void {
  }

  setHeight() {
    this.height = this.container.clientHeight;
    document.body.style.height = this.height + 'px';
  }

  ngAfterViewInit(): void {
    this.container = document.querySelector("#scroll-container");

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    ScrollTrigger.addEventListener("refreshInit", () => {
      this.setHeight();
    });

    // smooth scrolling container
    gsap.to(this.container, {
      y: () => -(this.height - document.documentElement.clientHeight),
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true,
      }
    });

    // section trigger
    gsap.utils.toArray('.section').forEach((section: any) => {
      gsap.to(section, {
        backgroundColor: '#000',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          markers: true,
          onEnter: (trigger: ScrollTrigger) => {

          },
        }
      });
    });

    this.setupLinks(this.container);

  }

  setupLinks(scroller: any) {
    let linkElements = gsap.utils.toArray('.nav a'),
      linkTargets = linkElements.map((e: any) => document.querySelector(e.getAttribute("href"))),
      linkPositions: any[] = [],
      calculatePositions = () => {
        let offset: any = gsap.getProperty(scroller, 'y');

        linkTargets.forEach((e, i) => linkPositions[i] = e.getBoundingClientRect().top - offset);
      };

    linkElements.forEach((element: any, i) => {
      element.addEventListener("click", (e: any) => {
        e.preventDefault();
        gsap.to(window, {scrollTo: linkPositions[i], ease: "power4", overwrite: true});
      });
    });

    ScrollTrigger.addEventListener("refresh", calculatePositions);
  }

}
