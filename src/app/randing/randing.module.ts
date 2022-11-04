import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandingComponent } from './randing.component';
import { RouterModule, Routes } from '@angular/router';
import { RandingTemporarilyComponent } from './randing-temporarily/randing-temporarily.component';

const routes: Routes = [
  { path: 'randing', component: RandingComponent },
  { path: 'randing-temporarily', component: RandingTemporarilyComponent },
  { path: '', redirectTo: 'randing', pathMatch: 'full' },
];

@NgModule({
  declarations: [RandingComponent, RandingTemporarilyComponent],
  imports: [CommonModule, RouterModule.forChild([...routes])],
})
export class RandingModule {}
