import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit {

  lottieOptions01: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime.json'
  };

  lottieOptions02: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime02.json'
  };

  lottieOptions03: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime03.json'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
