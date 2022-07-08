import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Ex01Component} from './ex01/ex01.component';
import { Ex02Component } from './ex02/ex02.component';


const routes: Routes = [
  {path: 'ex01', component: Ex01Component},
  {path: 'ex02', component: Ex02Component},
  {path: '', redirectTo: 'ex01', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    Ex01Component,
    Ex02Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([...routes]),
  ]
})
export class ThreeJsModule {
}
