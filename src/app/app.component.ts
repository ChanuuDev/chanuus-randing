import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {ChildrenOutletContexts, Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from './example/three-js/animation/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'randing page sample';

  @HostBinding('@.disabled')
  public animationsDisabled = false;

  constructor(
    private contexts: ChildrenOutletContexts,
    private router: Router,
  ) {
    window.addEventListener('load',() => {
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 100);
    });

    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }

  moveLink(link: string): void {
    this.router.navigateByUrl(link).then();
  }
}
