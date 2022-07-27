import {AfterViewInit, Component, OnInit} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// @ts-ignore
import LocomotiveScroll from 'locomotive-scroll';

@Component({
  selector: 'app-ex10',
  templateUrl: './ex10.component.html',
  styleUrls: ['./ex10.component.scss']
})
export class Ex10Component implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('.smooth-scroll'),
      smooth: true,
    });

    // each time Locomotive Scroll Updates, tell ScrollTrigger to update too (sync positioning)
    // Locomotive Scroll이 업데이트 될 때 마다 ScrollTrigger도 업데이트 하도록(동기화 위치 지정)
    locoScroll.on('scroll', ScrollTrigger.update);

    const smoothScrollEl: any = <Element>document.querySelector('.smooth-scroll');

    if (smoothScrollEl) {

      // ScrollTrigger.scrollerProxy methods for the
      // '.smooth-scroll' element since Locomotive Scroll is hijacking things
      ScrollTrigger.scrollerProxy('.smooth-scroll', {
          scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
          },
          getBoundingClientRect(): any {
            // we don't have to define a scrollLeft because we're only scrolling vertically.
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
          },
          pinType: smoothScrollEl.style.transform ? 'transform' : 'fixed'
        }
      );
    }


    // --- RED PANEL ---
    gsap.from(".line-1", {
      scrollTrigger: {
        trigger: ".line-1",
        scroller: ".smooth-scroll",
        scrub: true,
        start: "top bottom",
        end: "top top",
        onUpdate: self => console.log(self.direction)
      },
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none"
    });


// --- ORANGE PANEL ---
    gsap.from(".line-2", {
      scrollTrigger: {
        trigger: ".orange",
        scroller: ".smooth-scroll",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=100%"
      },
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none"
    });


// --- PURPLE/GREEN PANEL ---
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".purple",
        scroller: ".smooth-scroll",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=100%"
      }
    });

    tl.from(".purple p", {scale: 0.3, rotation:45, autoAlpha: 0, ease: "power2"})
      .from(".line-3", {scaleX: 0, transformOrigin: "left center", ease: "none"}, 0)
      .to(".purple", {backgroundColor: "#28a92b"}, 0);

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll
    // because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();


  }

}
