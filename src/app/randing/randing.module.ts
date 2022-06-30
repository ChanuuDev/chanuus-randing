import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RandingComponent} from './randing.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: 'randing', component: RandingComponent },
  {path: '', redirectTo: 'randing', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    RandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([...routes]),
  ]
})
export class RandingModule { }
