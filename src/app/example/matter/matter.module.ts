import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ex01Component } from './ex01/ex01.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path: 'ex01', component: Ex01Component },
  {path: '', redirectTo: 'ex01', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    Ex01Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([...routes]),
  ]
})
export class MatterModule { }
