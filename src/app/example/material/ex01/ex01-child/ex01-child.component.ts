import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-ex01-child',
  styleUrls: ['./ex01-child.component.scss'],
  template: `
    <div style="width: 100px; height: 100px; background-color: yellow; display: flex; align-content: center; justify-content: center;">
      <div>
        {{ count }}
      </div>
    </div>
  `,
})
export class Ex01ChildComponent implements OnInit, OnChanges {

  @Input() state = '';

  @Input() count = 0;

  @Output() stateChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Ex01ChildComponent Changes : ', changes);
  }
}
