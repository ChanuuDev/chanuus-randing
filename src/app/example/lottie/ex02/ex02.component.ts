import {ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss']
})
export class Ex02Component implements OnInit {

  lottieOptions01: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime.json',
    autoplay: false,
  };

  lottieOptions02: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime02.json'
  };

  lottieOptions03: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime03.json',
    autoplay: false,
    loop: false,
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

  handleAnimation1(anim: any) {
    this.anim = anim;
  }

  handleAnimation2(anim: any) {
    this.anim2 = anim;
  }

  handleAnimation3(anim: any) {
    this.anim3 = anim;
  }

  ex01LottieMouseOver(event: any): void {
    this.anim.play();
  }

  ex01LottieMouseOut(event: any): void {
    this.anim.pause();
  }

  ex02LottieMouseOver(event: any): void {
    this.anim2.play();
  }

  ex02LottieMouseOut(event: any): void {
    this.anim2.pause();
  }

  ex03LottieMouseOver(event: any): void {
    this.anim3.play();
    setTimeout(() => {
      this.renderer.addClass(document.getElementById('lottie-03'), 'lottie-visibility-hidden');
    }, 2000);
  }

  ex03LottieMouseOut(event: any): void {
    this.anim3.pause();
  }

}
