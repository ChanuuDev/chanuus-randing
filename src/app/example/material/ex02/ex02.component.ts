import {Component, Input, OnInit} from '@angular/core';
import {CupertinoPane, CupertinoSettings} from 'cupertino-pane';
// @ts-ignore
import { BackdropModule, FitHeightModule } from 'cupertino-pane/dist/modules';

export enum CardFace {
  Front = 'front',
  Back = 'back',
}

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss']
})
export class Ex02Component implements OnInit {

  CardFace = CardFace;

  cardFace = 'front';

  @Input() cupertinoParentTarget = '.cupertino-container-wrapper';

  cupertinoPane: CupertinoPane | undefined;

  cupertinoPaneSettings: CupertinoSettings = {
    parentElement: this.cupertinoParentTarget,
    cssClass: 'test',
    buttonDestroy: false,
    breaks: {
      top: { // Topper point that pane can reach
        enabled: true, // Enable or disable breakpoint
        height: 800, // Pane breakpoint height
      },
      middle: {
        enabled: true,
        height: 80,
      },
      bottom: { enabled: false }
    },
    freeMode: false,
    animationType: 'cubic-bezier(.125, .3, .075, 1)',
    animationDuration: 400,
  };

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    this.cupertinoPane = new CupertinoPane('.cupertino-pane', this.cupertinoPaneSettings);
    this.cupertinoPane.on('onDidDismiss', (event: any) => {
      console.log('cupertinoPane.onDidDismiss event : ', event);
      this.showPane();
    });

    await this.showPane();
  }

  async showPane(): Promise<void> {
    if (!this.cupertinoPane) {
      console.error('showing cupertinoPane failed!');
      return;
    }
    await this.cupertinoPane.present({ animate: true });
  }

  async destroyPane(): Promise<void> {
    if (!this.cupertinoPane) {
      console.error('destroy cupertinoPane failed!');
      return;
    }

    if (this.cupertinoPane.isPanePresented()) {
      await this.cupertinoPane.destroy({ animate: true });
    }
  }

  chooseCardFace(cardFace: CardFace): void {
    this.cardFace = cardFace;
  }

  async hidePane(): Promise<void> {
    if (!this.cupertinoPane) {
      console.error('cupertinoPane not found!!');
      return;
    }

    await this.cupertinoPane.moveToBreak('middle');
  }

  getFrontControllerStyle(): string {
    let resultStyle: string = '';

    switch (this.cardFace) {
      case 'front' :
        resultStyle = resultStyle + ` bright`;
        resultStyle = resultStyle + ` bg-white`;
        break;
      case 'back' :
        resultStyle = resultStyle + ` dark`;
        break;
    }

    return resultStyle;
  }

  getBackControllerStyle(): string {
    let resultStyle: string = '';

    switch (this.cardFace) {
      case 'front' :
        resultStyle = resultStyle + ` bright`;
        break;
      case 'back' :
        resultStyle = resultStyle + ` dark`;
        resultStyle = resultStyle + ` bg-black`;
        break;
    }

    return resultStyle;
  }

}
