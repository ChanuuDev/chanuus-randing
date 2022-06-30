import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit {

  lottieOptions: AnimationOptions = {
    path: '/assets/lottie-animations/sample-anime.json'
  }


  constructor() { }

  ngOnInit(): void {
  }

}
