import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule as LottieModules } from "ngx-lottie";
import player from "lottie-web";
import { Ex01Component } from './ex01/ex01.component';
import {RouterModule, Routes} from "@angular/router";

/* Lottie Json Animation Player */
export function playerFactory() {
  return player;
}

/* Example Component Routes */
const routes: Routes = [
  {path: 'ex01', component: Ex01Component },
  {path: '', redirectTo: 'ex01', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    Ex01Component
  ],
  imports: [
    CommonModule,
    LottieModules.forRoot({ player: playerFactory }),
    RouterModule.forChild([...routes]),

  ]
})
export class LottieModule { }
