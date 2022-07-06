import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from './lottie/lottie.module';
import {ThreeJsModule} from "./three-js/three-js.module";
import { GsapModule } from './gsap/gsap.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LottieModule,
    ThreeJsModule,
    GsapModule,
  ],
  exports: [],
})
export class ExampleModule { }
