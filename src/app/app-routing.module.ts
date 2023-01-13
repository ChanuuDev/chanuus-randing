import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./randing/randing.module').then((m) => m.RandingModule),
      },
      {
        path: 'gsap',
        loadChildren: () =>
          import('./example/gsap/gsap.module').then((m) => m.GsapModule),
      },
      {
        path: 'three',
        loadChildren: () =>
          import('./example/three-js/three-js.module').then((m) => m.ThreeJsModule),
      },
      {
        path: 'lottie',
        loadChildren: () =>
          import('./example/lottie/lottie.module').then((m) => m.LottieModule),
      },
      {
        path: 'matter',
        loadChildren: () => import('./example/matter/matter.module').then((m) => m.MatterModule),
      },
      {
        path: 'testes',
        loadChildren: () => import('./example/testes/testes.module').then((m) => m.TestesModule),
      },
    ]
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
