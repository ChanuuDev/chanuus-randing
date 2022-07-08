import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit, AfterViewInit {

  lottieOptions01: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime04.json',
    autoplay: true,
  };

  private anim: any;
  private anim2: any;
  private anim3: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  handleAnimation1(anim: any) {
    this.anim = anim;
  }

  showNextSceneCover(): void {
    this.renderer.addClass(document.getElementById('page-wrap'), 'next-scene01');

    setTimeout(() => {
      this.lottieOptions01 = {
        ...this.lottieOptions01,
        path: '/assets/lottie-animations/sample-anime05.json',
      }
      this.renderer.removeClass(document.getElementById('page-wrap'), 'next-scene01');
      this.renderer.addClass(document.getElementById('page-wrap'), 'next-scene02');
    }, 2000);
  }
}
