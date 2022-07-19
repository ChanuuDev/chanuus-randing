import {AfterViewInit, Component, OnInit} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from "gsap/ScrollToPlugin";

@Component({
  selector: 'app-ex09',
  templateUrl: './ex09.component.html',
  styleUrls: ['./ex09.component.scss']
})
export class Ex09Component implements OnInit, AfterViewInit {

  container: any;
  height: any;

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  setHeight() {
    this.height = this.container.clientHeight;
    document.body.style.height = this.height + 'px';
  }

  ngAfterViewInit(): void {
    this.container = document.querySelector(".wrapper");
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let scroll_tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.factsContainer',
          start: "top center",
          // pin: true,
          scrub: true,
          end: "+=300",
          // markers: true,
        }
      });

    let facts: any = document.querySelectorAll('.fact');

    scroll_tl.to('.factsContainer h2', {
      scale: 1.5,
      duration: 1,
      ease: "slow"
    });

    scroll_tl.to(facts, {
      xPercent: -85 * (facts.length - 1),
      scrollTrigger: {
        trigger: ".factsContainer_sm",
        start: "center center",
        pin: true,
        // horizontal: true,
        // pinSpacing:false,
        // markers: true,
        scrub: 1,
        // snap: 1 / (facts.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        // end: () => `+=${smallFactsContainer.offsetWidth}`
        end: () => `+=4320`
      }
    });

  }
}
