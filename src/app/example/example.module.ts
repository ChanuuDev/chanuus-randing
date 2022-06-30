import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from './lottie/lottie.module';
import {ThreeJsModule} from "./three-js/three-js.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LottieModule,
    ThreeJsModule,
  ],
  exports: [],
})
export class ExampleModule { }
