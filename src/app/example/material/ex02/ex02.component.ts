import {Component, OnInit} from '@angular/core';
import {CupertinoPane, CupertinoSettings} from "cupertino-pane";

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss']
})
export class Ex02Component implements OnInit {

  cardFace = 'front';

  cupertinoPane: CupertinoPane | undefined;
  cupertinoPaneSettings: CupertinoSettings = {
    parentElement: '.cupertino-container-wrapper',
    breaks: {
      top: { // Topper point that pane can reach
        enabled: true, // Enable or disable breakpoint
        height: 700, // Pane breakpoint height
        bounce: true // Bounce pane on transition
      },
      middle: { enabled: true, height: 80, bounce: true },
      bottom: { enabled: false }
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    this.cupertinoPane = new CupertinoPane(".cupertino-pane", this.cupertinoPaneSettings);
    this.showPane();
    this.cupertinoPane.on('onDidDismiss', (event: any) => {
      console.log('cupertinoPane.on event : ', event);
      this.showPane();

    })
  }

  showPane() {
    if (!this.cupertinoPane) {
      console.error('showing cupertinoPane failed!');
      return;
    }
    this.cupertinoPane.present({ animate: true });
  }

  destroyPane() {
    if (!this.cupertinoPane) {
      console.error('destroy cupertinoPane failed!');
      return;
    }

    if (this.cupertinoPane.isPanePresented()) {
      this.cupertinoPane.destroy({ animate: true });
    }
  }

  toggleCardFace(cardFace: string): void {
    this.cardFace = cardFace;
    console.log(this.cardFace);
  }

}
