import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Ex01Component} from "./ex01/ex01.component";
import {Ex02Component} from './ex02/ex02.component';
import {Ex03Component} from './ex03/ex03.component';
import {Ex04Component} from './ex04/ex04.component';
import { Ex05Component } from './ex05/ex05.component';
import { Ex06Component } from './ex06/ex06.component';
import { Ex07Component } from './ex07/ex07.component';
import { Ex08Component } from './ex08/ex08.component';
import { Ex09Component } from './ex09/ex09.component';
import { Ex10Component } from './ex10/ex10.component';

const routes: Routes = [
  {path: 'ex01', component: Ex01Component},
  {path: 'ex02', component: Ex02Component},
  {path: 'ex03', component: Ex03Component},
  {path: 'ex04', component: Ex04Component},
  {path: 'ex05', component: Ex05Component},
  {path: 'ex06', component: Ex06Component},
  {path: 'ex07', component: Ex07Component},
  {path: 'ex08', component: Ex08Component},
  {path: 'ex09', component: Ex09Component},
  {path: 'ex10', component: Ex10Component},
  {path: '', redirectTo: 'ex01', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    Ex01Component,
    Ex02Component,
    Ex03Component,
    Ex04Component,
    Ex05Component,
    Ex06Component,
    Ex07Component,
    Ex08Component,
    Ex09Component,
    Ex10Component
  ],
  imports: [CommonModule, RouterModule.forChild([...routes]),]
})
export class GsapModule {
}
