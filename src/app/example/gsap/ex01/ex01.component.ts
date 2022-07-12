import {AfterViewInit, Component, OnInit} from '@angular/core';
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
import SplitText from 'gsap-trial/SplitText'
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit, AfterViewInit {

  smoother: any;
  text1: any;

  split: any;

  constructor() {
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  }

  ngAfterViewInit(): void {
    this.smoother = ScrollSmoother.create({
      wrapper: '#section-wrap',
      content: '#section-content',
      smooth: 2,
      smoothTouch: true,
      effects: true,
    });

    const sec2: any = document.querySelector('#gsap-section-02');
    const sec2ScrollBox = gsap.timeline({
      scrollTrigger: {
        trigger: sec2,
        pin: true,
        start: "top top",
        end: "bottom bottom",
        markers: true,
        toggleActions: "play none none reverse",
        onEnter: () => {
          this.animateSec2Animation();
        },
      }
    });
    sec2ScrollBox.from(sec2, { opacity: 0 });

    const sec3: any = document.querySelector('#gsap-section-03');
    const sec3ScrollBox = gsap.timeline({
      scrollTrigger: {
        trigger: sec3,
        pin: true,
        start: "top top",
        end: "bottom bottom",
        markers: true,
        toggleActions: "play none none reverse",
        onEnter: () => {
          this.initTextAnimation();
        },
      }
    });
    sec3ScrollBox.from(sec3, { opacity: 0 });

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.gs_reveal').forEach((elem) => {
      this.hide(elem); // assure that the element is hidden when scrolled into view

      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => { this.animateFrom(elem) },
        onEnterBack: () => { this.animateFrom(elem, -1) },
        onLeave: () => { this.hide(elem) } // assure that the element is hidden when scrolled into view
      });
    })

    // const videoEl = <HTMLMediaElement>document.querySelector('#play-video-sample');
    const videoEl: any = document.querySelector('#play-video-sample');

    if (videoEl) {
      videoEl.play();
    }


  }

  moveTop(): void {
  }

  initTextAnimation(): void {
    gsap.set("#quote", {autoAlpha: 1})
    this.split = new SplitText('h1', {type: 'chars'})
    let animation = gsap.timeline({})
    animation.from(this.split.chars, {
      opacity: 0,
      y: 30,
      ease: 'back(4)',
      stagger: {
        from: 'start', //try "center" and "edges"
        each: 0.03
      }
    })
    // GSDevTools.create({animation: animation})
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
          toggleActions: "play none none reverse",

        }
      });
      scrollBox.from(box, {y: 30, opacity: 0});
    });

  }

  clickTest(): void {
    this.smoother.scrollTo("#gsap-section-02", true, "center center");
  }

  hide(elem: any) {
    gsap.set(elem, {autoAlpha: 0});
  }

  animateFrom(elem: any, direction?: any) {
    direction = direction || 1;
    let x = 0;
    let y = direction * 100;

    if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -300;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 200;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto"
    });
  }

  animateSec2Animation(direction?: any): void {
    direction = direction || 1;
    let x = 0;
    let y = 300;

    let elem: any = <Element>document.querySelector('#video-cover-text');

    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";

    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto"
    });
  }

}
