import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Ex01Component} from "./ex01/ex01.component";
import {Ex02Component} from './ex02/ex02.component';
import { Ex03Component } from './ex03/ex03.component';

const routes: Routes = [
  {path: 'ex01', component: Ex01Component},
  {path: 'ex02', component: Ex02Component},
  {path: 'ex03', component: Ex03Component},
  {path: '', redirectTo: 'ex01', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    Ex01Component,
    Ex02Component,
    Ex03Component
  ],
  imports: [CommonModule, RouterModule.forChild([...routes]),]
})
export class GsapModule {
}
