import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {Ex01Component} from './ex01/ex01.component';

@NgModule({
  declarations: [
    Ex01Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'admin-user-manage', component: Ex01Component},
    ]),
  ]
})
export class ThreeJsModule {
}
